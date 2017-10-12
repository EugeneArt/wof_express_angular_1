'use strict';
AngApp_comments.factory("commentsServices", ['$http','$location','$route','$state',
    function($http, $location, $route, $state) {
        var obj = {};
        obj.getComments = function(){
            return $http.get(serviceBase + 'comments');
        };
        obj.createComment = function (comment) {
            return $http.post( serviceBase + 'comments', comment )
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $location.path('/site/index');
            }
            function errorHandler( result ){
                alert("Error data");
                $location.path('/site/index')
            }
        };
        obj.getComment = function(commentID){
            return $http.get(serviceBase + 'comments/' + commentID);
        };
        obj.deleteComment = function (commentID) {
            return $http.delete(serviceBase + 'comments/' + commentID)
                .then( successHandler )
                .catch( errorHandler );
            function successHandler( result ) {
                $state.reload();
            }
            function errorHandler( result ){
                alert("Error data")
                $state.reload();
            }
        };
        return obj;
    }]);



