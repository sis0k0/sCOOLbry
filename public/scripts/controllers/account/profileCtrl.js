'use strict';

app.controller('ProfileCtrl', function($scope, identity, LibraryResource, FavouriteBookResource) {
    $scope.user = identity.currentUser;

    $scope.user.libraries = new Array();
    for(var i=0; i<$scope.user.librarySubscriptions.length; i++) {
    	$scope.user.libraries[i] = LibraryResource.get({id: $scope.user.librarySubscriptions[i]}, 
    		function () {
    			console.log($scope.user.libraries[i]);
    		});
    }

    $scope.favouriteBooks = FavouriteBookResource.get({userID: identity.currentUser._id});


});