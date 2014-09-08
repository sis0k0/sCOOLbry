'use strict';

app.controller('AddBookCtrl', function($scope, $location, $http, auth, notifier) {

	$http({
		method: 'get',
		url: '/api/genres'
	}).success(function(data) {
		$scope.genres = data;
	}).error(function(err) {
		console.log(err);
	});


    $scope.addBook = function(book) {
        auth.addBook(book).then(function() {
            notifier.success('Book added successfully!');
            $location.path('/admin/books');
        }, function(reason){
                notifier.error(reason);
            });
    };


});
