'use strict';
AngApp_gyms.controller('LevelsIndexCtrl', ['$scope', '$http','$state','$stateParams','$templateCache', 'levelsServices',
    function($scope,$http,$state,$stateParams,$templateCache, levelsServices) {
        levelsServices.getLevels().then(function(data){
            $scope.levels = data.data;
        });
        $scope.deleteLevel = function(levelID) {
            if(confirm("Вы уверены, что хотите удалить уровень: " + levelID)==true && levelID>0){
                levelsServices.deleteLevel(levelID);
            }
        };
    }])
    .controller('LevelsCreateCtrl', ['$scope', '$http', 'levelsServices','$location','levels',
        function($scope,$http,levelsServices,$location,level) {
            $scope.createLevel = function(level) {
                var results = levelsServices.createLevel(level);
            }
        }])
    .controller('LevelsUpdateCtrl', ['$scope', '$http', '$routeParams', 'levelsServices','$location','levels',
        function($scope,$http,$routeParams,levelsServices,$location,level) {
            var original = level.data;
            $scope.level = angular.copy(original.data);
            $scope.isClean = function() {
                return angular.equals(original, $scope.level);
            };
            $scope.updateLevel = function(level) {
                var results = levelsServices.updateLevel(level);
            }
        }]);