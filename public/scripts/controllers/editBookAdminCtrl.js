app.controller('editBookAdminCtrl', function($scope, $location, auth, ajax_post, BookResource, $routeParams, $http) {

    $scope.book = BookResource.get({id: $routeParams.id}, function(data){
	});
	
	
	
	$scope.updateBookAsAdmin = function(book) {
        auth.updateBookAsAdmin(book).then(function() {
            $location.path('/admin/books');
        });
    }

});
