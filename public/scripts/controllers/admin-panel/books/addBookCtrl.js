'use strict';

app.controller('AddBookCtrl', function($scope, $window, $http, Book, notifier) {

	$http({
		method: 'get',
		url: '/api/genres'
	}).success(function(data) {
		$scope.genres = data;
	}).error(function(err) {
		console.log(err);
	});


    $scope.addBook = function(book) {
        Book.addBook(book).then(function() {
            $window.location.href = '/admin/books';
            notifier.success('Book added successfully!');
        }, function(reason){
                notifier.error(reason);
            });
    };


});
