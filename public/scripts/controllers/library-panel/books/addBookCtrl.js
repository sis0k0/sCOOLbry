'use strict';

app.controller('LibraryAddBookCtrl', function($scope, $location, $http, auth, notifier, identity) {
    $scope.user = identity.currentUser;
    $scope.libraryID = identity.currentUser.ownLibraryID;
	$http({
		method: 'get',
		url: '/api/genres'
	}).success(function(data) {
		console.log(data);
		$scope.genres = data;
	}).error(function(err) {
		console.log(err);
	});


    $scope.addBook = function(book) {
        auth.addBook(book, identity.currentUser.ownLibraryID).then(function() {
            notifier.success('Book added successfully!');
            $location.path('/libraryPanel/books-library');
        }, function(reason){
                notifier.error(reason);
            });
    };


});
