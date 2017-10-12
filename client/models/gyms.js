'use strict';
AngApp_gyms.factory("gymsServices", ['$http','$location','$route', '$state',
    function($http,$location,$route,$state) {
        var obj = {};
        obj.getGyms = function(){
            return $http.get(serviceBase + 'gyms');
        };
        obj.getGym = function(gymID){
            return $http.get(serviceBase + 'gyms/' + gymID);
        };
        obj.createGym = function (gym) {
            return $http.post( serviceBase + 'gyms', gym )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/gyms/index');
            }
            function errorHandler( result ){
                alert("Error data")
                $location.path('/gyms/create')
            }
        };
        obj.updateGym = function (gym) {
            return $http.put(serviceBase + 'gyms/'+ gym.id, gym )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/gyms/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/gyms/update/' + gym.id)
            }
        };
        obj.deleteGym = function (gymID) {
            return $http.delete(serviceBase + 'gyms/' + gymID)
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $state.reload();
            }
            function errorHandler( result ){
                alert("Error data")
                $route.reload();
            }
        };
        return obj;
    }]);


