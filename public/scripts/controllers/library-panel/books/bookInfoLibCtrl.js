'use strict';

app.controller('BookInfoLibCtrl', function($scope, LibBookResource2, BookResource, $routeParams) {

    $scope.showMore = true;

    $scope.libraryBook = LibBookResource2.get({id: $routeParams.id}, function() {
        $scope.book = BookResource.get({id: $scope.libraryBook.bookID});

    });
   
});
