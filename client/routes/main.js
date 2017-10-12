'use strict';
AngApp_main
    .config(function($stateProvider) {
        $stateProvider
            .state('site', {
                url: '/site/index',
                views: {
                    'nav': {
                        controller: 'nav',
                        templateUrl: 'views/nav/index.html'
                    },
                    'main': {
                        controller: 'index',
                        templateUrl: 'views/site/index.html'
                    }
                }
            })
    });
