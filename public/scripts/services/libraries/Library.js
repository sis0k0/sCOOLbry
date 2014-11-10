'use strict';

app.factory('Library', function($http, $q, UsersResource, UserResource, LibraryResource, LibrarianResource) {
	return {
		addLibrary: function(library, librarians) {
			var deferred = $q.defer();
			var libraryID;
			var newLibrary = new LibraryResource(library);
			
			// Save the library
			newLibrary.$save(function(data) {
				libraryID = data._id;

				// Link the librarians to the created library
				librarians.forEach(function(element){

					element.ownLibraryID = libraryID;
					element.ownLibraryID = libraryID;
					element.ownLibraryID = libraryID;
					element.ownLibraryID = libraryID;
					var newUser = new LibrarianResource(element);
					newUser.$save().then(function(data) {
						$http({
							method: 'get',
							url: '/api/library/addLibrarian/'+libraryID+'/'+data._id
						});
					});
				});

				// Link the library to the librarians' profiles
				for (var userID in library.librarians) {
					var user = UserResource.get({id: library.librarians[userID]});
					user.ownLibraryID = libraryID;
					
					var updatedUser = new UsersResource(user);
					updatedUser._id = library.librarians[userID];
					updatedUser.$update();
				}
				library._id = libraryID;
				
			}).then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		updateLibrary: function(library) {
			var deferred = $q.defer();
			
			var updatedLibrary = new LibraryResource(library);
			
			delete updatedLibrary.$resolved;
			delete updatedLibrary.$promise;
			
			console.log(updatedLibrary);

			updatedLibrary.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		}
	};
});
