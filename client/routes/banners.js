'use strict';
AngApp_banners.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('banners', {
            url: '/banners/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'BannersIndexCtrl',
                    templateUrl: 'views/banners/index.html'
                }
            }
        })
        .state('banners/create', {
            url: '/banners/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'BannersCreateCtrl',
                    templateUrl: 'views/banners/create.html'
                }
            },
            resolve: {
                banners: function(bannersServices){
                    return bannersServices.getBanners();
                }
            }
        })
        .state('banners/update', {
            url: '/banners/update/:bannerId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'BannersUpdateCtrl',
                    templateUrl: 'views/banners/update.html'
                }
            },
            resolve: {
                banners: function($stateParams, bannersServices){
                    var bannerId = $stateParams.bannerId;
                    return bannersServices.getBanner(bannerId);
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});