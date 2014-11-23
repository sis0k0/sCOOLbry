'use strict';

app.factory('Library', function($http, $q, UsersResource, UserResource, identity, LibraryResource, LibrarianResource) {
	return {

		registerLibrary: function(library, librarian) {
			var deferred = $q.defer(),
				libraryID,
				newUser = new UsersResource(librarian);

			// Create new user - the library owner's profile
			newUser.$save().then(function(userData) {

				// Create the new library
				library.librarians = userData._id;
				var newLibrary = new LibraryResource(library);
				newLibrary._id = userData.ownLibraryID;

				newLibrary.$save().then(function(libraryData) {

					// Update the owner's profile to hold the library ID as ownLibraryID
					librarian.ownLibraryID = libraryData._id;
					var updatedUser = new UsersResource(librarian);
					updatedUser._id = userData._id;

					updatedUser.$update().then(function(someData) {
						identity.currentUser = updatedUser;

						deferred.resolve();
					}, function(response) {
						deferred.reject(response.data.reason);
					})
				}, function(response) {
					deferred.reject(response.data.reason);
				});

			}, function(response) {
				deferred.reject(response.data.reason);
			});

			return deferred.promise;

		},

		addLibrary: function(library, librarians) {
			var deferred = $q.defer(),
				libraryID,
				newLibrary = new LibraryResource(library);
			
			// Save the library
			newLibrary.$save(function(data) {
				libraryID = data._id;

				// Link the librarians to the created library
				librarians.forEach(function(element){

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
				for (var id in library.librarians) {

					var user = UserResource.get({id: library.librarians[id]._id});

					user.ownLibraryID = libraryID;
					
					var updatedUser = new UsersResource(user);
					updatedUser._id = library.librarians[id]._id;
					updatedUser.$update().then(function(){
					}, function(reason) {
						deferred.reject(reason);
					});

				}
				library._id = libraryID;
				
			}).then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		updateLibrary: function(library, librarians) {
			var deferred = $q.defer();
			var libraryID;
			var updatedLibrary = new LibraryResource(library);
			
			// Update the library
			updatedLibrary.$update(function(data) {
				libraryID = data._id;

				// Link the librarians to the updated library
				librarians.forEach(function(element){

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
				for (var id in library.librarians) {

					var user = UserResource.get({id: library.librarians[id]._id});

					user.ownLibraryID = libraryID;
					
					var updatedUser = new UsersResource(user);
					updatedUser._id = library.librarians[id]._id;
					updatedUser.$update().then(function(){
					}, function(reason) {
						deferred.reject(reason);
					});

				}
				library._id = libraryID;
				
			}).then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		}
	};
});
