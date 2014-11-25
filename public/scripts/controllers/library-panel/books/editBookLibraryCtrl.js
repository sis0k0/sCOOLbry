'use strict';

app.controller('EditBookLibraryCtrl', function($scope, $location, Library, LibBookResource2, $routeParams) {

    $scope.book = LibBookResource2.get({id: $routeParams.id});
	console.log($scope.book);

	$scope.updateLibBookAsLibrarian = function(book) {
        Library.updateLibBookAsLibrarian(book).then(function() {
            $location.path('/library-panel/books-library');
        });
    };
});
