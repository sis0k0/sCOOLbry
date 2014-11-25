'use strict';

app.controller('AddUserToLibraryCtrl', function($scope, $location, Library, notifier, identity) {
    $scope.libraryID = identity.currentUser.ownLibraryID;
	console.log("blah");

    $scope.addUserToLibrary = function(user) {
		user.given = 0;
		user.toReturn = 0;
        Library.addUserToLibrary(user, identity.currentUser.ownLibraryID).then(function() {
            notifier.success('User added successfully!');
            $location.path('/library-panel/users');
        }, function(reason){
                notifier.error(reason);
            });
    };


});
