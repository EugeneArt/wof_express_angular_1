'use strict';
AngApp_banners.factory("bannersServices", ['$http','$location','$route','$state','Upload',
    function($http, $location, $route, $state, $upload) {
        var obj = {};
        obj.getBanners = function(){
            return $http.get(serviceBase + 'banners');
        };
        obj.createBanner = function (banner) {
            return $upload.upload({
                url: serviceBase + 'banners',
                data: banner
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/banners/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/banners/create')
            }
        };
        obj.updateBanner = function (banner) {
            return $upload.upload({
                url: serviceBase + 'banners/' + banner.id,
                data: banner,
                method: 'PUT'
            })
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/banners/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/banners/update/' + banner.id)
            }
        };
        obj.getBanner = function(bannerID){
            return $http.get(serviceBase + 'banners/' + bannerID);
        };
        obj.changeToCurrentBanner = function (banner) {
            return $upload.upload({
                url: serviceBase + 'banners/' + banner.id,
                data: banner,
                method: 'PUT'
            })
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
        obj.deleteBanner = function (bannerID) {
            return $http.delete(serviceBase + 'banners/' + bannerID)
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



