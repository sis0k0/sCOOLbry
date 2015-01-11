'use strict';

app.factory('LibraryUsers', function($q, LibUserResource, UsersResource) {
	return {
		addUserToLibrary: function(user, libraryID) {
			var deferred = $q.defer();
			if(typeof libraryID !== 'undefined') {
				user.libraryID = libraryID;
			}
		
			var newUser = new LibUserResource(user);
			newUser.$save().then(function() {

				// Update the user's profile to hold the libraryID
				user.librarySubscriptions.push(libraryID);
				var updatedUser = new UsersResource(user);
				updatedUser._id = user._id;

				updatedUser.$update().then(function(someData) {
					console.log('shallqq-->');
					console.log(someData);
					deferred.resolve();
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
