'use strict';
AngApp_gyms.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('gyms', {
            url: '/gyms/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'GymsIndexCtrl',
                    templateUrl: 'views/gyms/index.html'
                }
            }
        })
        .state('gyms/create', {
            url: '/gyms/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'GymsCreateCtrl',
                    templateUrl: 'views/gyms/create.html'
                }
            },
            resolve: {
                gyms: function(gymsServices){
                    return gymsServices.getGyms();
                }
            }
        })
        .state('gyms/update', {
            url: '/gyms/update/:gymId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'GymsUpdateCtrl',
                    templateUrl: 'views/gyms/update.html'
                }
            },
            resolve: {
                gyms: function($stateParams, gymsServices){
                    var gymId = $stateParams.gymId;
                    return gymsServices.getGym(gymId);
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});