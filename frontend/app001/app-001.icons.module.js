/**
 * Created by yasar on 29.08.2016.
 */

(function () {

    angular.module("apt.app001.icons", [])
        .config([
            'aptTemplProvider',
            function (aptTempl) {

                angular.merge(aptTempl.appConfig, {
                    iconLib : 'icomoon',
                    defaults: {
                        icons : {
                            icomoon: {
                                add                      : 'thumbs-up2',
                                'add-to-list'            : 'folder-plus4',
                                approveAccept            : 'thumbs-up2',
                                approveReject            : 'thumbs-down2',
                                approveRequest           : 'share-square-o',
                                calendar                 : 'calendar52',
                                cancel                   : 'x',
                                check                    : 'checkmark2',
                                close                    : 'times',
                                collapse                 : 'fold',
                                create                   : 'cogs',
                                credit                   : 'minus-circle2',
                                desc                     : 'file-text-o',
                                debt                     : 'plus-circle2',
                                delete                   : 'trash',
                                dismantle                : 'move-down',
                                edit                     : 'pencil',
                                entity                   : 'building',
                                images                   : 'camera',
                                'item-menu'              : 'more',
                                installation             : 'move-up',
                                location                 : 'map-marker',
                                option                   : 'circle-o',
                                preview                  : 'eye',
                                remove                   : 'minus2',
                                save                     : 'floppy-disk',
                                'set-discount'           : 'stats-decline2',
                                'select-item'            : 'eye8',
                                'status-approved'        : 'check',
                                'status-approve-unlocked': 'unlock',
                                'status-approve_unlocked': 'unlock',
                                'status-completed'       : 'check',
                                'status-dismantle'       : 'eject',
                                'status-dismantled'      : 'eject',
                                'status-in-process'      : 'flag-checkered',
                                'status-in_process'      : 'flag-checkered',
                                'status-installation'    : 'magic',
                                'status-na'              : 'minus',
                                'status-oncall'          : 'bell',
                                'status-on-call'         : 'bell',
                                'status-on_call'         : 'bell',
                                'status-pending-approve' : 'hourglass-o',
                                'status-planning'        : 'circle-o-notch',
                                upload                   : 'cloud-upload',
                                update                   : 'floppy-disk',
                                view                     : 'desktop',
                                viewReport               : 'suitcase',
                            }
                        },
                        colors: {
                            'collapsed' : '#235645',
                            'completed' : '#AACDF5',
                            'dismantled': '#154859',
                            'in_process': '#55F055',
                            'planning'  : '#663344',
                        }
                    }
                });
            }
        ])
    ;
})();
