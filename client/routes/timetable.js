'use strict';
AngApp_timetable.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("timetable", {
            url: '/timetable/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TimetableIndexCtrl',
                    templateUrl: 'views/timetable/index.html'
                }
            }
        })
        .state("timetable/create", {
            url: '/timetable/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TimetableCreateCtrl',
                    templateUrl: 'views/timetable/create.html'
                }
            },
            resolve: {
                timetable: function(timeTableServices){
                    return timeTableServices.getTimetables();
                }
            }
        })
        .state('timetable/update', {
            url: '/timetable/update/:timetableId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TimetableUpdateCtrl',
                    templateUrl: 'views/timetable/update.html'
                }
            },
            resolve: {
                timetable: function($stateParams, timeTableServices){
                    var timetableId = $stateParams.timetableId;
                    return timeTableServices.getTimetable(timetableId);
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});
