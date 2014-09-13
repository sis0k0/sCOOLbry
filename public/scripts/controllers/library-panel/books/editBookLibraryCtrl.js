'use strict';

app.controller('EditBookLibraryCtrl', function($scope, $location, auth, LibBookResource2, $routeParams) {

    $scope.book = LibBookResource2.get({id: $routeParams.id});
console.log($scope.book);

	$scope.updateLibBookAsLibrarian = function(book) {
        auth.updateLibBookAsLibrarian(book).then(function() {
            $location.path('/libraryPanel/books-library');
        });
    };
});
