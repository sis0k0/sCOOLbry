app.controller('editLibraryAdminCtrl', function($scope, $location, auth, ajax_post, LibraryResource, $routeParams, $http) {

    $scope.library = LibraryResource.get({id: $routeParams.id}, function(data){
	});
	
	
	$scope.updateLibraryAsAdmin = function(library) {
        auth.updateLibraryAsAdmin(library).then(function() {
            $location.path('/admin/libraries');
        });
    }

});
