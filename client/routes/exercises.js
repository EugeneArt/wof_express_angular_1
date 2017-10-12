'use strict';
AngApp_exercises.config(function($stateProvider) {
    $stateProvider
        .state("exercises", {
            url: '/exercises/index',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'ExercisesIndexCtrl',
                    templateUrl: 'views/exercises/index.html'
                }
            }
        })
        .state('exercises/exercise', {
            url: '/exercises/exercise/index/:exerciseId',
            views: {
                'nav': {
                    controller: 'nav',
                    templateUrl: 'views/nav/index.html'
                },
                'main': {
                    controller: 'ExerciseGetCtrl',
                    templateUrl: 'views/exercises/exercise.html'
                }
            },
            resolve: {
                exercises: function ($stateParams,exercisesServices) {
                    var exerciseId = $stateParams.exerciseId;
                    return exercisesServices.getExercise(exerciseId);
                }
            }
        })
        .state("exercises/create", {
            url: '/exercises/create',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'ExercisesCreateCtrl',
                    templateUrl: 'views/exercises/create.html'
                }
            },
            resolve: {
                exercises: function(exercisesServices){
                    return exercisesServices.getExercises();
                }
            }
        })
        .state("exercises/update", {
            url: '/exercises/update/:exerciseId',
            views: {
                'nav': { templateUrl: 'views/nav/admin.html'},
                'main': {
                    controller: 'ExercisesUpdateCtrl',
                    templateUrl: 'views/exercises/update.html'
                }
            },
            resolve: {
                exercise: function ($stateParams,exercisesServices) {
                    var exerciseId = $stateParams.exerciseId;
                    return exercisesServices.getExercise(exerciseId);
                }
            }
        });
});