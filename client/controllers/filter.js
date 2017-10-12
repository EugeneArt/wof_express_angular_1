'use strict';
AngApp_filter.controller('FilterIndexCtrl', ['$scope', '$http','filterServices',
    function($scope,$http,filterServices) {
            filterServices.getQuery().then(function(data){
                $scope.timetables = data.data;
            });
            $scope.filter = filterServices.filter;
    }])
    .controller('FilterCreateCtrl', ['$scope', '$http', 'filterServices','trainersServices','exercisesServices','gymsServices','levelsServices','$location','timetable',
        function($scope,$http,filterServices,trainersServices,exercisesServices,gymsServices,levelsServices,$location,timetable) {
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
            $scope.getQuery = function(data) {

                var query = "";
                var filter= {};

                for(var i in data){
                    if(data[i] !== undefined){
                        if(i === "day" || i === "hour"){
                            query += i + "=" + encodeURIComponent(data[i])  +"&";
                            filter[i] = data[i] ;
                        } else {
                            var id = data[i].split(",")[0];
                            var name = data[i].split(",")[1];
                            query += i + "=" + encodeURIComponent(id) +"&";
                            filter[i] = name;
                        }
                    }
                }

                if( data === undefined) {
                    filter = undefined;
                }

                filterServices.query = query.slice(0,-1);
                filterServices.filter = filter;
                $location.path('/filter/index');
            };
        }]);
