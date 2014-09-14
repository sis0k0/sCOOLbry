'use strict';

app.controller('UserInteractLibraryCtrl', function($scope, UserResource, $routeParams, identity, auth, notifier) {
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
    
    $scope.giveBook = function(interact) {
		interact.userID = $routeParams.id;
		interact.libraryID = identity.currentUser.ownLibraryID;
		interact.librarian1ID = identity.currentUser._id;
        auth.giveBook(interact).then(function() {
            notifier.success('Book given successfully!');
            $location.path('/libraryPanel/users');
        }, function(reason){
                notifier.error(reason);
            });
    };
});
