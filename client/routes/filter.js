'use strict';
AngApp_filter.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('filter', {
            url: '/filter/index',
            views: {
                'nav': {
                    controller: 'nav',
                    templateUrl: 'views/nav/index.html'
                },
                'main': {
                    controller: 'FilterIndexCtrl',
                    templateUrl: 'views/filter/index.html'
                }
            }
        })
        .state('filter/create', {
            url: '/filter/create',
            views: {
                'nav': {
                    controller: 'nav',
                    templateUrl: 'views/nav/index.html'
                },
                'main': {
                    controller: 'FilterCreateCtrl',
                    templateUrl: 'views/filter/create.html'
                }
            },
            resolve: {
                timetable: function(timeTableServices){
                    return timeTableServices.getTimetables();
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});
