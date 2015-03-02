'use strict';

app.controller('EditBookLibraryCtrl', function($scope, $location, LibraryBook, notifier, LibBookResource2, BookResource, LibraryResource, $routeParams) {

    // Get library book
    $scope.libraryBook = LibBookResource2.get({id: $routeParams.id}, function() {
        // Get book
        $scope.book = BookResource.get({id: $scope.libraryBook.bookID});

        // Get library
        $scope.library = LibraryResource.get({id: $scope.libraryBook.libraryID});
    });

    // Update book function
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
