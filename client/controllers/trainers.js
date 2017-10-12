'use strict';
AngApp_trainers.controller('TrainersIndexCtrl', ['$scope', '$http', 'trainersServices',
    function($scope,$http,trainersServices) {
        trainersServices.getTrainers().then(function(data){
            $scope.trainers = data.data;
        });
        $scope.deleteTrainer = function(trainerID) {
            if(confirm("Вы уверены, что хотите удалить тренера: " + trainerID)==true && trainerID>0){
                trainersServices.deleteTrainer(trainerID);
            }
        };
    }])
    .controller('TrainerGetCtrl', ['$scope','$http', 'trainersServices','$location','trainers',
        function($scope,$http,trainersServices,$location,trainers) {
            var original = trainers.data;
            $scope.trainer = angular.copy(original.data);
        }])
    
    .controller('TrainersCreateCtrl', ['$scope','$http', 'trainersServices','$location','trainers',
        function($scope,$http,trainersServices,$location,trainers) {
            $scope.createTrainer = function(trainer) {
                    var data = {
                        file: $scope.file,
                        'trainer_name' : trainer.trainer_name,
                        'trainer_tagline' : trainer.trainer_tagline,
                        'trainer_achievements' : trainer.trainer_achievements
                    };
                var results = trainersServices.createTrainer(data);
            };
        }])

    .controller('TrainersUpdateCtrl', ['$scope', '$http', '$routeParams', 'trainersServices','$location','trainers',
        function($scope,$http,$routeParams,trainersServices,$location,trainer) {
            var original = trainer.data;
            $scope.trainer = angular.copy(original.data);
            $scope.isClean = function() {
                return angular.equals(original, $scope.trainer);
            };
            $scope.update = function(trainer) {
                var data = {
                    file: $scope.file || trainer.trainer_img,
                    'id': trainer.id,
                    'trainer_name' : trainer.trainer_name,
                    'trainer_tagline' : trainer.trainer_tagline,
                    'trainer_achievements' : trainer.trainer_achievements
                };
            console.log(data);
                var results = trainersServices.updateTrainer(data);
            }
        }]);
