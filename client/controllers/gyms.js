'use strict';
AngApp_gyms.controller('GymsIndexCtrl', ['$scope', '$http','$state','$stateParams','$templateCache', 'gymsServices',
    function($scope,$http,$state,$stateParams,$templateCache, gymsServices) {
        gymsServices.getGyms().then(function(data){
            $scope.gyms = data.data;
        });
        $scope.deleteGym = function(gymID) {
            if(confirm("Вы уверены, что хотите удалить зал: " + gymID)==true && gymID>0){
                gymsServices.deleteGym(gymID);
            }
        };
    }])
    .controller('GymsCreateCtrl', ['$scope', '$http', 'gymsServices','$location','gyms',
        function($scope,$http,gymsServices,$location,gym) {
            $scope.createGym = function(gym) {
                var results = gymsServices.createGym(gym);
            }
        }])
    .controller('GymsUpdateCtrl', ['$scope', '$http', '$routeParams', 'gymsServices','$location','gyms',
        function($scope,$http,$routeParams,gymsServices,$location,gym) {
            var original = gym.data;
            $scope.gym = angular.copy(original.data);
            $scope.isClean = function() {
                return angular.equals(original, $scope.gym);
            };
            $scope.updateGym = function(gym) {
                var results = gymsServices.updateGym(gym);
            }
        }]);