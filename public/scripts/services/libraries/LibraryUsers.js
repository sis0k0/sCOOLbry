'use strict';

app.factory('LibraryUsers', function($q, LibUserResource, UsersResource) {
    return {
        addUserToLibrary: function(user, libraryID, paid) {
            var deferred = $q.defer();
            if(typeof libraryID !== 'undefined') {
                user.libraryID = libraryID;
            }
            
            user.active = !paid;
            var newUser = new LibUserResource(user);
            newUser.$save().then(function(libUserData) {

                // Update the user's profile to hold the libraryID
                user.librarySubscriptions.push(libraryID);
                var updatedUser = new UsersResource(user);
                updatedUser._id = user._id;

                updatedUser.$update().then(function(someData) {
                    console.log(someData);
                    deferred.resolve(libUserData);
                }, function(response) {
                    deferred.reject(response.data.reason);
                });

            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
