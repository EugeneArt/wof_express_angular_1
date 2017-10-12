'use strict';
AngApp_comments.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('comments', {
            url: '/comments/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'CommentsIndexCtrl',
                    templateUrl: 'views/comments/index.html'
                }
            }
        })
        .state('comments/create', {
            url: '/comment/create',
            views: {
                'nav': {
                    controller: 'nav',
                    templateUrl: 'views/nav/index.html'
                },
                'main': {
                    controller: 'CommentsCreateCtrl',
                    templateUrl: 'views/comments/create.html'
                }
            },
            resolve: {
                comment: function(commentsServices){
                    return commentsServices.getComments();
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});