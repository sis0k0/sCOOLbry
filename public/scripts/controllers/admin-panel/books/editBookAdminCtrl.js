'use strict';

app.controller('editBookAdminCtrl', function($scope, $location, $http, auth, ajaxPost, BookResource, $routeParams) {

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
        auth.updateBookAsAdmin(book).then(function() {
            $location.path('/admin/books');
        });
    };
});
