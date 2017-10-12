'use strict';
AngApp_filter.factory("filterServices", ['$http','$location','$route','$state',
    function($http, $location, $route, $state) {
        var obj = {};
        obj.getQuery = function () {
            return $http.get(serviceBase + 'filters?' + obj.query);
        };
        obj.query = "";
        obj.filter = {};
        return obj;
    }]);



