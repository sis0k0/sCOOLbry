'use strict';

app.controller('editBookAdminCtrl', function($scope, $location, auth, ajaxPost, BookResource, $routeParams) {

    $scope.book = BookResource.get({id: $routeParams.id});
    
	$scope.updateBookAsAdmin = function(book) {
        auth.updateBookAsAdmin(book).then(function() {
            $location.path('/admin/books');
        });
    };
});
