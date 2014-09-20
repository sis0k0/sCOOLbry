'use strict';

app.controller('LibraryDetailsPageCtrl', function($scope, $routeParams, cachedLibraries, LibBookResource, UserReadingResource, identity, $http) {
    $scope.library = cachedLibraries.query().$promise.then(function(collection) {
        collection.forEach(function(library) {
            if (library._id === $routeParams.id) {
                $scope.library = library;
            }
        });
    });
    
    $scope.books = LibBookResource.query({id: $routeParams.id});


    $scope.isMember = function() {
		if(identity.currentUser===undefined) return false;
		var responsePromise = $http.get('/api/library/member/'+$routeParams.id+'/'+identity.currentUser._id);
	    responsePromise.success(function(data) {
			console.log(data);
            if(data==='true'){
                return true;
            }else{
                return false;
            }
	    });           
    };
    if(identity.currentUser===undefined) {
		$scope.readings = [];
	}else{
		$scope.readings = UserReadingResource.query({ userID: identity.currentUser._id, libraryID: $routeParams.id });
	}

    console.log($scope.readings);
});
