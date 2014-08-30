'use strict';

app.controller('editLibraryAdminCtrl', function($scope, $location, auth, ajax_post, LibraryResource, $routeParams) {

    $scope.library = LibraryResource.get({id: $routeParams.id});
	
	
	
	$scope.updateLibraryAsAdmin = function(library) {
        auth.updateLibraryAsAdmin(library).then(function() {
            $location.path('/admin/libraries');
        });
    };

});
