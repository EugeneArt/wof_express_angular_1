'use strict';
AngApp_timetable.controller('TimetableIndexCtrl', ['$scope', '$http', 'timeTableServices',
    function($scope,$http, timeTableServices) {
        timeTableServices.getTimetables().then(function(data){
            $scope.timetables = data.data;
        });
        $scope.deleteTimetable = function(timetableID) {
            if(confirm("Вы уверены, что хотите удалить расписание: " + timetableID)==true && timetableID>0){
                timeTableServices.deleteTimetable(timetableID);
            }
        };
    }])
    .controller('TimetableCreateCtrl', ['$scope', '$http', 'timeTableServices','trainersServices','exercisesServices','gymsServices','levelsServices','$location','timetable',
        function($scope,$http,timeTableServices,trainersServices,exercisesServices,gymsServices,levelsServices,$location,timetable) {
            trainersServices.getTrainers().then(function(data){
                $scope.trainers = data.data;
            });
            exercisesServices.getExercises().then(function(data){
                $scope.exercises = data.data;
            });
            gymsServices.getGyms().then(function(data){
                $scope.gyms = data.data;
            });
            levelsServices.getLevels().then(function(data){
                $scope.levels = data.data;
            });
            $scope.createTimetable = function(timetable) {
                var results = timeTableServices.createTimetable(timetable);
            }
        }])
    .controller('TimetableUpdateCtrl', ['$scope', '$http', '$routeParams', 'timeTableServices', 'trainersServices','exercisesServices','gymsServices','levelsServices','$location','timetable',
        function($scope,$http,$routeParams,timeTableServices,trainersServices,exercisesServices,gymsServices,levelsServices, $location,timetable) {
            var original = timetable.data;
            $scope.timetable = angular.copy(original.data);
            $scope.isClean = function() {
                return angular.equals(original, $scope.timetable);
            };
            trainersServices.getTrainers().then(function(data){
                $scope.trainers = data.data;
            });
            exercisesServices.getExercises().then(function(data){
                $scope.exercises = data.data;
            });
            gymsServices.getGyms().then(function(data){
                $scope.gyms = data.data;
            });
            levelsServices.getLevels().then(function(data){
                $scope.levels = data.data;
            });

            $scope.updateTimetable = function(timetable) {
                var results = timeTableServices.updateTimetable(timetable);
            }
    }]);
