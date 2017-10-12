'use strict';
AngApp_comments.controller('CommentsIndexCtrl', ['$scope', '$http', 'commentsServices',
    function($scope,$http,commentsServices) {
        commentsServices.getComments().then(function(data){
            $scope.comments = data.data;
        });
        $scope.deleteComment = function(commentID) {
            if(confirm("Вы уверены, что хотите удалить комментарий: " + commentID)==true && commentID>0){
                commentsServices.deleteComment(commentID);
            }
        };
    }])
    .controller('CommentsCreateCtrl', ['$scope', '$http', 'commentsServices','$location','comment',
        function($scope,$http,commentsServices,$location,comment) {
            $scope.createComment = function(comment) {
                var results = commentsServices.createComment(comment);
            }
        }]);
