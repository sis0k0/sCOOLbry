'use strict';

app.controller('AddBookCtrl', function($scope, $window, $http, Book, BookSearch, notifier) {

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

    $scope.findBook = function() {
    	console.log($scope.ISBNSearch);

    	var bookPromise = BookSearch.search($scope.ISBNSearch);
    	bookPromise.then(function success(data) {
    		console.log(data);
    	}, function error(msg) {
    		console.log('not found');
    	});
    }


});
