'use strict';

app.controller('EditBookLibraryCtrl', function($scope, $location, LibraryBook, notifier, LibBookResource2,BookResource, $routeParams) {


    $scope.libraryBook = LibBookResource2.get({id: $routeParams.id}, function() {

        $scope.book = BookResource.get({id: $scope.libraryBook.bookID});
    });

    $scope.updateLibBookAsLibrarian = function(updatedLibraryBook) {
        updatedLibraryBook.available = updatedLibraryBook.total - updatedLibraryBook.given;
        console.log($scope.backUpBook);
        LibraryBook.update(updatedLibraryBook).then(function() {
            notifier.success('\'' + updatedLibraryBook.bookName + '\' successfully updated!');
            $location.path('/library-panel/books-library');
        }, function(err) {
            notifier.error(err.data);
        });
    };
});
