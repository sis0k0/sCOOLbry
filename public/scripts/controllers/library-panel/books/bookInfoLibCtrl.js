'use strict';

app.controller('BookInfoLibCtrl', function($scope, LibBookResource2, BookResource, $routeParams, $location) {

    $scope.showMore = true;

    $scope.libraryBook = LibBookResource2.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        } else {
            $scope.book = BookResource.get({id: $scope.libraryBook.bookID}, function(data) {
                if(!data) {
                    $location.path('/404');
                }
            }, function() {
                $location.path('/404');
            });
        }
    }, function() {
        $location.path('/404');
    });
   
});
