'use strict';

app.controller('LibraryDetailsPageCtrl', function($scope, User, $routeParams, $route, BookResource, cachedLibraries, LibBooksResource, UserReadingResource, identity, $http, LibraryUsers, notifier, $location) {
		
	$scope.user = identity.currentUser;

	$scope.library = cachedLibraries.query().$promise.then(function(collection) {
		collection.forEach(function(library) {
			if (library._id === $routeParams.id) {
				$scope.library = library;
			}
		});
	});

	
	$scope.libBooks = LibBooksResource.query({id: $routeParams.id}, function() {

		$scope.books = new Array();
		for(var i=0; i<$scope.libBooks.length; i++) {
			$scope.books[i] = BookResource.get({id: $scope.libBooks[i].bookID}, function() {
			});
		}
	});
	

	if(identity.currentUser===undefined) {
		$scope.isMember = false;
		$scope.isLoggedIn = false;
	}else{
		var responsePromise = $http.get('/api/library/member/'+$routeParams.id+'/'+identity.currentUser._id);
		responsePromise.success(function(data) {
			if(data===true){
				$scope.isMember = true;
			}else{
				$scope.isMember = false;
			}
		});
		console.log($scope.isMember);
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
		LibraryUsers.addUserToLibrary(identity.currentUser, $routeParams.id).then(function() {
			notifier.success('You\'ve subscribed successfully!');
			$route.reload();
		}, function(reason){
				notifier.error(reason);
			});
	};
	
 	$scope.unsubscribeForLibrary = function() {
		var responsePromise = $http.get('/api/library/delete-user/'+identity.currentUser._id+'/'+$routeParams.id);
		responsePromise.success(function(data) {

			$scope.user.librarySubscriptions.splice($scope.user.librarySubscriptions.indexOf($routeParams.id), 1);
			
			
			User.update($scope.user).then(function() {

				notifier.success('You\'ve unsubscribed successfully!');
				$route.reload();
			}, function(reason) {
				notifier.error(reason);
			});

		
		}).error(function(reason) {
			notifier.error(reason);
		});	  
		
	};

});
