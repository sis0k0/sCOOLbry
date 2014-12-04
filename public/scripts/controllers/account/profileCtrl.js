'use strict';

app.controller('ProfileCtrl', function($scope, identity, LibraryResource, FavouriteBookResource) {
    $scope.user = identity.currentUser;

    $scope.user.libraries = new Array();
    for(var i=0; i<$scope.user.librarySubscriptions.length; i++) {
    	$scope.user.libraries[i] = LibraryResource.get({id: $scope.user.librarySubscriptions[i]}, 
    		function () {
    			console.log('libs0');
    			console.log($scope.user.libraries[i]);

			    $scope.bookings = BookingResourceSortable.query({
					libraryID: $scope.user.libraries[i],
					field: $scope.field,
					order: $scope.order,
					page: $scope.page,
					perPage: $scope.perPage
				}, function() {
					console.log('bookings');
					console.log($scope.bookings);
				});


    		});
    }

    $scope.favouriteBooks = FavouriteBookResource.get({userID: identity.currentUser._id});


});