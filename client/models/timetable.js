'use strict';
AngApp_timetable.factory("timeTableServices", ['$http','$location','$route','$state',
    function($http,$location,$route, $state) {
        var obj = {};
        obj.getTimetables = function(){
            return $http.get(serviceBase + 'timetables');
        };
        obj.createTimetable = function (timetable) {
            return $http.post( serviceBase + 'timetables', timetable )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/timetable/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/timetable/create')
            }
        };
        obj.getTimetable = function(timetableID){
            return $http.get(serviceBase + 'timetables/' + timetableID);
        };
        obj.updateTimetable = function (timetable) {
            return $http.put(serviceBase + 'timetables/'+ timetable.id, timetable )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/timetable/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/timetable/update/' + timetable.id)
            }
        };
        obj.deleteTimetable = function (timetableID) {
            return $http.delete(serviceBase + 'timetables/' + timetableID)
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
