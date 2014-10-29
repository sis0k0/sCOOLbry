'use strict';

app.controller('UserInteractLibraryCtrl', function($scope, UserResource, $routeParams, identity, LibraryUsersInteractions, notifier, $http, $location) {
	
    $scope.userInfo = UserResource.get({id: $routeParams.id}, function(data){
	
		if(data.dateOfBirth===undefined){
			data.dateOfBirth = 'N/A';
		}
	
		if(data.facebookUrl===undefined){
			data.facebookUrl = 'N/A';
		}
	
		if(data.twitterUrl===undefined){
			data.twitterUrl = 'N/A';
		}
	
		if(data.googlePlusUrl===undefined){
			data.googlePlusUrl = 'N/A';
		}
	
		if(data.aboutMe===undefined){
			data.aboutMe = 'N/A';
		}
		
		
	});
    
    $http({
		method: 'get',
		url: '/api/library/not-returned/'+identity.currentUser.ownLibraryID+'/'+$routeParams.id
	}).success(function(data) {
		$scope.userInfo.books = data;
		console.log($scope.userInfo.books);
	}).error(function(err) {
		console.log(err);
	});
	

    $scope.giveBook = function(interact) {
		
		interact.userID = $routeParams.id;
		interact.libraryID = identity.currentUser.ownLibraryID;
		interact.librarian1ID = identity.currentUser._id;
        LibraryUsersInteractions.giveBook(interact).then(function() {
            notifier.success('Book given successfully!');
            $location.path('/libraryPanel/users');
        }, function(reason){
                notifier.error(reason);
            });
    };
    
    $scope.returnBook = function(interact) {
		interact.userID = $routeParams.id;
		interact.libraryID = identity.currentUser.ownLibraryID;
		interact.librarian2ID = identity.currentUser._id;
		interact.returnDate = new Date();
        LibraryUsersInteractions.returnBook(interact).then(function() {
            notifier.success('Book returned successfully!');
            $location.path('/libraryPanel/users');
        }, function(reason){
                notifier.error(reason);
            });
    };
});
