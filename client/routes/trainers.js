'use strict';
AngApp_trainers.config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('trainers', {
            url: '/trainers/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TrainersIndexCtrl',
                    templateUrl: 'views/trainers/index.html'
                }
            }
        })
        .state('trainers/trainer', {
            url: '/trainers/trainer/index/:trainerId',
            views: {
                'nav': {
                    controller: 'nav',
                    templateUrl: 'views/nav/index.html'
                },
                'main': {
                    controller: 'TrainerGetCtrl',
                    templateUrl: 'views/trainers/trainer.html'
                }
            },
            resolve: {
                trainers: function ($stateParams,trainersServices ) {
                    var trainerId = $stateParams.trainerId;
                    return trainersServices.getTrainer(trainerId);
                }
            }
        })
        .state('trainers/create', {
            url: '/trainers/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TrainersCreateCtrl',
                    templateUrl: 'views/trainers/create.html'
                }
            },
            resolve: {
                trainers: function(trainersServices){
                    return trainersServices.getTrainers();
                }
            }
        })
        .state('trainers/update', {
            url: '/trainers/update/:trainerId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'TrainersUpdateCtrl',
                    templateUrl: 'views/trainers/update.html'
                }
            },
            resolve: {
                trainers: function ($stateParams,trainersServices ) {
                    var trainerId = $stateParams.trainerId;
                    return trainersServices.getTrainer(trainerId);
                }
            }
        });
    $urlRouterProvider.otherwise('/site/index');
});
