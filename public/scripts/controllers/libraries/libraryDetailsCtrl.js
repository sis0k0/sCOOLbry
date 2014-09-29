'use strict';

app.controller('LibraryDetailsPageCtrl', function($scope, $routeParams, cachedLibraries, LibBookResource, UserReadingResource, identity, $http, auth, notifier, $location) {
    $scope.library = cachedLibraries.query().$promise.then(function(collection) {
        collection.forEach(function(library) {
            if (library._id === $routeParams.id) {
                $scope.library = library;
            }
        });
    });
    
    $scope.books = LibBookResource.query({id: $routeParams.id});

    if(identity.currentUser===undefined) {
		$scope.isMember = false;
		$scope.isLoggedIn = false;
	}else{
		var responsePromise = $http.get('/api/library/member/'+$routeParams.id+'/'+identity.currentUser._id);
		responsePromise.success(function(data) {
			if(data==='true'){
				$scope.isMember = true;
			}else{
				$scope.isMember = false;
			}
		});      
		
		$scope.isLoggedIn = true;     
	}
	
    if(identity.currentUser===undefined) {
		$scope.readings = [];
	}else{
		$scope.readings = UserReadingResource.query({ userID: identity.currentUser._id, libraryID: $routeParams.id });
	}
	
	$scope.subscribeForLibrary = function() {
		identity.currentUser.given = 0;
		identity.currentUser.toReturn = 0;
		identity.currentUser.userID = identity.currentUser._id;
        auth.addUserToLibrary(identity.currentUser, $routeParams.id).then(function() {
            notifier.success('You\'ve subscribed successfully!');
            $location.path('/libraries');
        }, function(reason){
                notifier.error(reason);
            });
    };

});
