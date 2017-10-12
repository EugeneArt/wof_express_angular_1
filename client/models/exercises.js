'use strict';
AngApp_exercises.factory("exercisesServices", ['$http','$location','$route','$state','Upload',
    function($http, $location, $route, $state, $upload) {
        var obj = {};
        obj.getExercises = function(){
            return $http.get(serviceBase + 'exercises');
        };
        obj.createExercise = function (exercise) {
            return $upload.upload({
                url: serviceBase +  'exercises',
                arrayKey: '',
                data: exercise
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/exercises/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/exercises/create');
            }
        };
        obj.getExercise = function(exerciseID){
            return $http.get(serviceBase + 'exercises/' + exerciseID);
        };

        obj.updateExercise = function (exercise) {
            return $upload.upload({
                url: serviceBase + 'exercises/' + exercise.id,
                arrayKey: '',
                data: exercise,
                method: 'PUT'
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/exercises/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/exercises/update/' +exercise.id);
            }
        };
        obj.deleteExercise = function (exerciseID) {
            return $http.delete(serviceBase + 'exercises/' + exerciseID)
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $state.reload();
            }
            function errorHandler( result ){
                alert("Error data");
                $state.reload();
            }
        };
        return obj;
    }]);

