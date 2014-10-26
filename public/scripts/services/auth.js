'use strict';

app.factory('auth', function($http, $q, identity, UsersResource, UserResource, LibraryResource, BookResource, LibBookResource2, LibUserResource, ReadingResource, ReadingResource2, LibrarianResource, BookingResource) {
	return {
		signup: function(user) {
			var deferred = $q.defer();

			var newUser = new UsersResource(user);
			newUser.$save().then(function() {
				identity.currentUser = newUser;
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
		},
		update: function(user) {
			var deferred = $q.defer();

			var updatedUser = new UsersResource(user);
			console.log(updatedUser);
			updatedUser._id = identity.currentUser._id;
			updatedUser.$update().then(function() {
				identity.currentUser = updatedUser;
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		addUserAsAdmin: function(user, library, newLibrary) {
			var deferred = $q.defer();
			var newUser = new UsersResource(user);
			newUser._id = user._id;
			console.log('auth js');
			if(library!==undefined) {
				if(newLibrary===true) {
					// Create new library, save the user and update library's librarians

					// Create the library
					var newLibraryResource = new LibraryResource(library);
					newLibraryResource.$save(function(data) {

						// Create the user
						newUser.ownLibraryID = data._id;
						newUser.$save(function(userData) {

							// Update the library to hold the user's ID in its librarians
							library.librarians = userData._id;
							var updatedLibrary = new LibraryResource(library);
							updatedLibrary._id = userData.ownLibraryID;

							updatedLibrary.$update().then(function() {
								deferred.resolve();
							}, function(response) {
								deferred.reject(response);
							});

						}, function(response) {
							deferred.reject(response);
						});
					}, function(response) {
						deferred.reject(response);
					});
					return deferred.promise;
				} else {
					// Update existing library and create the user after that

					newUser.$save(function(data) {
						library.librarians.push(data._id);
						var updatedLibrary = new LibraryResource(library);
						updatedLibrary.$update().then(function() {
							deferred.resolve();
						}, function(response) {
							deferred.reject(response);
						});
					}, function(response) {
						deferred.reject(response);
					});

					return deferred.promise;
				}
			} else {
				// Update the user if he's not a librarian
				console.log('before save');
				newUser.$save().then(function() {
					console.log('saved');
					deferred.resolve();

				}, function(response) {
					deferred.reject(response);
				});
				return deferred.promise;
			}


		},
		updateAsAdmin: function(user, library, newLibrary) {
			var deferred = $q.defer();
			var updatedUser = new UsersResource(user);
			updatedUser._id = user._id;
			if(library!==undefined) {
				if(newLibrary===true) {
					// Create new library and update the user after that
					var newLibraryResource = new LibraryResource(library);
					newLibraryResource.$save(function(data) {
						updatedUser.ownLibraryID = data._id;
						updatedUser.$update().then(function() {
							deferred.resolve();
						}, function(response) {
							deferred.reject(response);
						});
					});
					return deferred.promise;
				} else {
					// Update existing library and the user after that
					library.librarians.push(user._id);
					var updatedLibrary = new LibraryResource(library);
					updatedLibrary._id = library._id;
					updatedLibrary.$update(function(data) {
						updatedUser.ownLibraryID = data._id;
						updatedUser.$update().then(function() {
							deferred.resolve();
						}, function(response) {
							deferred.reject(response);
						});
					});
					return deferred.promise;
				}
			} else {
				// Update the user if he's not a librarian
				updatedUser.$update().then(function() {
					deferred.resolve();
				}, function(response) {
					deferred.reject(response);
				});
				return deferred.promise;
			}


		},
		addLibrary: function(library, librarians) {
			
			var deferred = $q.defer();
			
			var libraryID;

			var newLibrary = new LibraryResource(library);
			newLibrary.$save(function(data) {
				// Add library
				libraryID = data._id;
				librarians.forEach(function(element){
        			element.ownLibraryID = libraryID;
		  			var newUser = new LibrarianResource(element);
					newUser.$save().then(function(data) {
						$http({
							method: 'get',
							url: '/api/library/addLibrarian/'+libraryID+'/'+data._id
						}).success(function() {

						}).error(function() {
						});
					});



       			});

				for (var userID in library.librarians) {
					// Link library to the librarians' profiles
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
				
				deferred.reject(response.data.reason);
	
			});


				
				
			return deferred.promise;
		},
		updateLibraryAsAdmin: function(library) {
			var deferred = $q.defer();

			var updatedLibrary = new LibraryResource(library);
			updatedLibrary._id = library._id;
			updatedLibrary.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		updateLibraryAsLibrarian: function(library) {
			var deferred = $q.defer();
			var updatedLibrary = new LibraryResource(library);
			updatedLibrary._id = library._id;
			updatedLibrary.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		updateBookAsAdmin: function(book) {
			var deferred = $q.defer();

			var updatedBook = new BookResource(book);
			updatedBook._id = book._id;
			updatedBook.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		updateLibBookAsLibrarian: function(book) {
			var deferred = $q.defer();

			var updatedBook = new LibBookResource2(book);
			updatedBook._id = book._id;
			updatedBook.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		},
		addBook: function(book, libraryID) {
			var deferred = $q.defer();
			if(typeof libraryID !== undefined) {
				book.libraryID = libraryID;
			}
			
			var newBook = new BookResource(book);
			newBook.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
		},
		addUserToLibrary: function(user, libraryID) {
			var deferred = $q.defer();
			if(typeof libraryID !== undefined) {
				user.libraryID = libraryID;
			}
			console.log(user);
		
			var newUser = new LibUserResource(user);
			newUser.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
		},
		login: function(user){
			var deferred = $q.defer();

			$http.post('/login', user).success(function(response) {
				if (response.success) {
					var user = new UsersResource();
					angular.extend(user, response.user);
					identity.currentUser = user;
					deferred.resolve(true);
				}
				else {
					deferred.resolve(false);
				}
			});

			return deferred.promise;
		},
		logout: function() {
			var deferred = $q.defer();

			$http.post('/logout').success(function() {
				identity.currentUser = undefined;
				deferred.resolve();
			});

			return deferred.promise;
		},
		isAuthenticated: function() {
			if (identity.isAuthenticated()) {
				return true;
			}
			else {
				return $q.reject('not authorized');
			}
		},
		isAuthorizedForRole: function(role) {
			if (identity.isAuthorizedForRole(role)) {
				return true;
			}
			else {
				return $q.reject('not authorized');
			}
		},
		giveBook: function(interact) {
			var deferred = $q.defer();
			
			var newReading = new ReadingResource(interact);
			newReading.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
		},
		returnBook: function(interact) {
			var deferred = $q.defer();
			
			var newReading = new ReadingResource2(interact);
			newReading.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
		},
		addBooking: function(booking){
			var deferred = $q.defer();
			
			var newBooking = new BookingResource(booking);
			newBooking.$save().then(function() {
				deferred.resolve();
			}, function(response) {
				
				deferred.reject(response.data.reason);
			});

			return deferred.promise;
			
		}
	};
});
