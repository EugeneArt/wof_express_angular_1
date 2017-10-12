'use strict';
AngApp_levels.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('levels', {
            url: '/levels/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'LevelsIndexCtrl',
                    templateUrl: 'views/levels/index.html'
                }
            }
        })
        .state('levels/create', {
            url: '/levels/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'LevelsCreateCtrl',
                    templateUrl: 'views/levels/create.html'
                }
            },
            resolve: {
                levels: function(levelsServices){
                    return levelsServices.getLevels();
                }
            }
        })
        .state('levels/update', {
            url: '/levels/update/:levelId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'LevelsUpdateCtrl',
                    templateUrl: 'views/levels/update.html'
                }
            },
            resolve: {
                levels: function($stateParams, levelsServices){
                    var levelId = $stateParams.levelId;
                    return levelsServices.getLevel(levelId);
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});