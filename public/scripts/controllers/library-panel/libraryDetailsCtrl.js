'use strict';

app.controller('LibraryDetailsCtrl', function($scope, LibraryResource, $routeParams, $http, identity, auth, $location) {
	
    $scope.user = identity.currentUser;
	$scope.library = LibraryResource.get({
		id: $scope.user.ownLibraryID
	});
	
	$scope.updateLibraryAsLibrarian = function(library) {
        auth.updateLibraryAsLibrarian(library).then(function() {
			console.log(library);
            $location.path('/libraryPanel');
        });
    };
});
