'use strict';

app.controller('EditBookAdminCtrl', function($scope, $location, $http, Book, ajaxPost, BookResource, $routeParams) {

    $scope.book = BookResource.get({id: $routeParams.id});

    $http({
		method: 'get',
		url: '/api/genres'
	}).success(function(data) {
		$scope.genres = data;
	}).error(function(err) {
		console.log(err);
	});

	$scope.updateBookAsAdmin = function(book) {
        Book.updateAsAdmin(book).then(function() {
            $location.path('/admin/books');
        });
    };
});
