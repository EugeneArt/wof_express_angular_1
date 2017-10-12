'use strict';
AngApp_levels.factory("levelsServices", ['$http','$location','$route', '$state',
    function($http,$location,$route,$state) {
        var obj = {};
        obj.getLevels = function(){
            return $http.get(serviceBase + 'levels');
        };
        obj.getLevel = function(levelID){
            return $http.get(serviceBase + 'levels/' + levelID);
        };
        obj.createLevel = function (level) {
            return $http.post( serviceBase + 'levels', level )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/levels/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/levels/create')
            }
        };
        obj.updateLevel = function (level) {
            return $http.put(serviceBase + 'levels/'+ level.id, level )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/levels/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/levels/update/' + level.id)
            }
        };
        obj.deleteLevel = function (levelID) {
            return $http.delete(serviceBase + 'levels/' + levelID)
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


