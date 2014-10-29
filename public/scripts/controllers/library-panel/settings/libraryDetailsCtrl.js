'use strict';

app.controller('LibraryDetailsCtrl', function($scope, LibraryResource, $routeParams, $http, identity, Library, $location) {
	
    $scope.user = identity.currentUser;
	$scope.library = LibraryResource.get({
		id: $scope.user.ownLibraryID
	}, function(library) {
		//library.monday = true; TODO set monday, tuesday + hours to values
	});

	
	$scope.updateLibrary = function(library) {
        Library.updateLibrary(library).then(function() {
			console.log(library);
            $location.path('/libraryPanel');
        });
    };

    $scope.get24hours = function(){
    	var a = new Array(24);
    	console.log(a);

    	return a;
    };
});
