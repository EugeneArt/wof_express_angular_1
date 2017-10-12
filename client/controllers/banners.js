'use strict';
AngApp_banners.controller('BannersIndexCtrl', ['$scope', '$http','$state','$stateParams','$templateCache', 'bannersServices',
    function($scope,$http,$state,$stateParams,$templateCache, bannersServices) {
        bannersServices.getBanners().then(function(data){
            $scope.banners = data.data;
        });
        $scope.deleteBanner = function(bannerID) {
            if(confirm("Вы уверены, что хотите удалить баннер: " + bannerID)==true && bannerID>0){
                bannersServices.deleteBanner(bannerID);
            }
        };
        $scope.changeToCurrent = function(bannerID) {
            var data = {
                'id': bannerID,
                'is_used' : 1
            };
                bannersServices.changeToCurrentBanner(data);
        };
    }])
    .controller('BannersCreateCtrl', ['$scope', '$http', 'bannersServices','$location','banners',
        function($scope,$http,bannersServices,$location,banner) {
            $scope.createBanner = function(banner) {
                var data = {
                    file: $scope.file,
                    'name' : banner.name
                };
                console.log(data);
                var results = bannersServices.createBanner(data);
            }

        }])
    .controller('BannersUpdateCtrl', ['$scope', '$http', '$routeParams', 'bannersServices','$location','banners',
        function($scope,$http,$routeParams,bannersServices,$location,banner) {
            var original = banner.data;
            $scope.banner = angular.copy(original.data);
            $scope.isClean = function() {
                return angular.equals(original, $scope.banner);
            };
            $scope.updateBanner = function(banner) {
                var data = {
                    'id': banner.id,
                    'name' : banner.name,
                    file: $scope.file || banner.image_url
                };
                console.log(data);
                var results = bannersServices.updateBanner(data);
            }
        }]);