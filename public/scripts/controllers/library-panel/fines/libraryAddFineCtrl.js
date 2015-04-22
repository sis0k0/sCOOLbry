'use strict';
app.controller('LibraryAddFineCtrl', function($scope, $routeParams, $location, identity, notifier, Fine, UserResource) {

    // Add Fine
    $scope.finedUserInfo = UserResource.get({id: $routeParams.userID}, function(){
    	
	//process user info if needed

    }, function() {                             // if error occurs
        $location.path('/library-panel/fines'); // go to 404 page
    });


    $scope.addFine = function(fine) {
        
        var fineObject = {
        	amount: fine.amount,
        	reason: fine.reason,
        	userID: $scope.finedUserInfo._id,
        	username: $scope.finedUserInfo.username,
        	libraryID: identity.currentUser.ownLibraryID
        };

		Fine.add(fineObject).then(function() {
            notifier.success('Fine added successfully!');
            
            $location.path('/library-panel/fines');
            
        }, function(){
            $location.path('/library-panel/fines');

        });
    };


});

