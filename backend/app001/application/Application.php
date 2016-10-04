<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 04.05.2016
 * Time: 20:04
 */

namespace BYRWEB\app001\application;

use BYRWEB\base\ADbObject;
use BYRWEB\base\IDbObject;
use BYRWEB\base\SecurityUtils;
use BYRWEB\base\WTDbUtils;

class Application //extends ADbObject implements IDbObject
{
//    public function __construct()
//    {
//        $this->setRecordObject(new ApplicationRecord());
//    }

    /**
     * @var \PDO
     */
    public static $db;

    /**
     * @param $post
     */

    public static function processPost($post)
    {
        foreach ($post as $field => $value) {

            $field_id = Application::checkFieldExists($field);

            if ($field_id == FALSE) {
                $field_id = Application::addField($field);
            }
            if (!array_key_exists('client_id', $post)) {
                $post['client_id'] = NULL;
            }
            $row_nr = Application::getRowNr($post['app_id']);
            $app_data = [
                'field_id'  => $field_id,
                'value'     => $value,
                'client_id' => $post['client_id'],
                'row_nr'    => $row_nr,
                'app_id'    => $post['app_id']
            ];
            Application::insertAppData($app_data);
        }

        Application::updateRowNr($post['app_id']);
    }

    /**
     * @param $post
     */

    public static function processUpdate($post)
    {
        foreach ($post as $key => $value) {
            if ($key == 'row_nr') continue;
            $field_id = Application::checkFieldExists($key);
            $post_data = [
                'field_id'  => $field_id,
                'value'     => $value,
                'person_id' => $post['person_id'],
                'app_id'    => $post['app_id'],
                'row_nr'    => $post['row_nr']
            ];

            Application::updateData($post_data);

        }
    }

    /**
     * @param $app_id
     * @param $row_nr
     *
     * @return bool|null
     */

    public static function processDelete($app_id, $row_nr)
    {
        $delete_data = [
            ['app_id' => $app_id, 'row_nr' => $row_nr]
        ];
        $return = FALSE;
        foreach ($delete_data as $data) {
            $return = Application::deleteData($data['app_id'], $data['row_nr']);
        }

        return $return;

    }

    /**
     * @param $name
     *
     * @return bool|string
     */

    public static function addField($name)
    {
        $sql = 'insert into app_field set `name` = :name';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['name' => $name]);

        if ('00000' !== $sth->errorCode()) {
            error_log($sth->errorInfo());

            return FALSE;
        }

        return Application::$db->lastInsertId();
    }

    /**
     * @param $name
     *
     * @return bool
     */

    public static function checkFieldExists($name)
    {
        $sql = 'select COUNT(*) as total,af.field_id from app_field as af where af.name = :name ';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['name' => $name]);
        $row = $sth->fetch(\PDO::FETCH_ASSOC);

        if ($row['total'] == 0) {
            return FALSE;
        }

        return $row['field_id'];
    }

    /**
     * @param $post
     *
     * @return bool
     *
     * row_nr, column_name eklenecek.
     */

    public static function insertAppData($post)
    {
        $sql = 'insert into app_data set
                app_id = :app_id,
                field_id = :field_id,
                client_id = :client_id,
                `value` = :value,
                row_nr = :row_nr';
        $sth = Application::$db->prepare($sql);
        $sth->execute($post);

        if ('00000' !== $sth->errorCode()) {
            error_log($sth->errorInfo());

//            throw new \Exception($sth->errorInfo());
            return FALSE;
        }

        return TRUE;
    }

    /**
     * @param array $post
     *
     * @return bool
     */

    public static function updateData(array $post)
    {
        $sql = 'update app_data set
                client_id = :client_id,
                `value` = :value
                where
                app_id = :app_id && row_nr = :row_nr && field_id = :field_id';
        $sth = Application::$db->prepare($sql);
        $sth->execute($post);
        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }

        return TRUE;
    }

    /**
     * @param $app_id
     * @param $row_nr
     *
     * @return bool
     */

    public static function deleteData($app_id, $row_nr)
    {
        $sql = 'delete from app_data where app_id = :app_id && row_nr = :row_nr';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['app_id' => $app_id, 'row_nr' => $row_nr]);
        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }

        return TRUE;
    }

    /**
     * @param $app_id
     *
     * @return array|bool
     */

    public static function getAllData($app_id)
    {
        $sql = 'SELECT
                    app_data.app_id,
                    app_data.client_id,
                    app_data.`value`,
                    app_field.`name`,
                    app_data.row_nr
                FROM
                    app_data
                LEFT JOIN app_field ON app_field.field_id = app_data.field_id
                WHERE
                    app_id = :app_id';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['app_id' => $app_id]);

        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }
        $rows = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $data = [];
        $_data = [];

        foreach ($rows as $row) {
            $_data[intval($row['row_nr'])][$row['name']] = $row['value'];

            if (!array_key_exists('row_nr', $_data)) {
                $_data[intval($row['row_nr'])]['row_nr'] = $row['row_nr'];
            }
        }
        /**
         * $_data diye oluşturduğumuz arrayin indis id'si 0'dan başlamadığı için array objeye dönüşüyor.
         * Bunun önüne geçmek için aşağıdaki olayı gerçekleştirdik.
         */

        foreach ($_data as $data_row) {
            $data[] = $data_row;
        }

        return $data;

    }

    /**
     * @param $app_id
     * @param $row_nr
     *
     * @return array|bool
     */

    public function getData($app_id, $row_nr)
    {
        $sql = 'SELECT
                    app_field.field_id,
                    app_field.`name`,
                    app_data.app_id,
                    app_data.field_id,
                    app_data.client_id,
                    app_data.`value`,
                    app_data.row_nr
                FROM
                    app_data
                INNER JOIN app_field ON app_field.field_id = app_data.field_id
                WHERE
                    app_data.row_nr = :row_nr && app_data.app_id = :app_id';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['row_nr' => $row_nr, 'app_id' => $app_id]);
        if ('00000' !== $sth->errorCode()) {
            error_log($sth->errorInfo());

            return FALSE;
        }
        $rows = $sth->fetchAll(\PDO::FETCH_ASSOC);

        $data = [];
        $_data = [];

        foreach ($rows as $row) {
            $_data[intval($row['row_nr'])][$row['name']] = $row['value'];

            if (!array_key_exists('row_nr', $_data)) {
                $_data[intval($row['row_nr'])]['row_nr'] = $row['row_nr'];
            }
        }
        /**
         * $_data diye oluşturduğumuz arrayin indis id'si 0'dan başlamadığı için array objeye dönüşüyor.
         * Bunun önüne geçmek için aşağıdaki olayı gerçekleştirdik.
         */

        foreach ($_data as $data_row) {
            $data = $data_row;
        }

        return $data;
    }

    /**
     * -----------------------
     * getRowNr , updateRowNr
     * -----------------------
     *
     * @author Murat Demir
     *
     * @date   08.10.2015
     *
     * Gelen postun içinde row_nr yok ve biz editi row_nr üzerinden yapıyoruz.
     * Apps tablosundan row_ctr'den dönen değeri app_data row_nr'ye set edilmesi sağlıyoruz.
     *
     */

    /**
     * @param $app_id
     *
     * @return bool
     */

    public static function getRowNr($app_id)
    {
        $sql = 'select row_ctr from apps where app_id = :app_id';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['app_id' => $app_id]);
        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }
        $row = $sth->fetch(\PDO::FETCH_ASSOC);

        return $row['row_ctr'];
    }

    /**
     * @param $app_id
     *
     * @return bool
     */

    public static function updateRowNr($app_id)
    {
        $sql = 'update apps set row_ctr = row_ctr+1 where app_id = :app_id';
        $sth = Application::$db->prepare($sql);
        $sth->execute(['app_id' => $app_id]);
        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }

        return TRUE;
    }

    public static function getApplications($group_name)
    {
        $sql = "select _.* from apps as _ where _.group_name='$group_name' and " . SecurityUtils::getEnterpriseSecurityForQuery();
        $sth = self::$db->query($sql);

        if ('00000' !== $sth->errorCode()) {
            return FALSE;
        }
        $rows = $sth->fetchAll(\PDO::FETCH_ASSOC);

        return $rows;

    }
}