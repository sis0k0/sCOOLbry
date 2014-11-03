'use strict';

app.factory('LibraryUsers', function($q, LibUserResource) {
	return {
		addUserToLibrary: function(user, libraryID) {
			var deferred = $q.defer();
			if(typeof libraryID !== "undefined") {
				user.libraryID = libraryID;
			}
		
			var newUser = new LibUserResource(user);
			newUser.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		}
	};
});
