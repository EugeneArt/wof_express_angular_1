'use strict';
AngApp_trainers.factory("trainersServices", ['$http','$location','$route','$state','Upload',
    function($http, $location, $route, $state, $upload) {
        var obj = {};
        obj.getTrainers = function(){
            return $http.get(serviceBase + 'trainers');
        };
        obj.getTrainer = function(trainerID){
            return $http.get(serviceBase + 'trainers/' + trainerID);
        };
        obj.createTrainer = function (trainer) {
            return $upload.upload({
                url: serviceBase + 'trainers',
                data: trainer
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/trainers/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/trainers/create')
            }
        };
        obj.updateTrainer = function (trainer) {
            return $upload.upload({
                url: serviceBase + 'trainers/' + trainer.id,
                data: trainer,
                method: 'PUT'
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/trainers/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/trainers/update/' + trainer.id)
            }
        };
        obj.deleteTrainer = function (trainerID) {
            return $http.delete(serviceBase + 'trainers/' + trainerID)
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $state.reload();
            }
            function errorHandler( result ){
                alert("Error data");
                $route.reload();
            }
        };
        return obj;
    }]);

