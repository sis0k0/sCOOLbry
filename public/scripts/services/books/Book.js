
'use strict';

app.factory('Book', function($q, $http, BookResource, LibraryBooks) {
	return {
		add: function(book, libraryID) {
			var deferred = $q.defer();



			
			if(book.hasOwnProperty('foundInDatabase')===false) {

				var newBook = new BookResource(book);
				newBook.$save().then(function(data) {

					if(typeof(libraryID) !== 'undefined') {
						book.libraryID = libraryID;
						book._id = data._id;
						LibraryBooks.addLibBook(book).then(function() {
							deferred.resolve();
						}, function(err) {
							deferred.reject(err);
						});
					}

				}, function(response) {
					deferred.reject(response);
				});

			} else {
				console.log(book);
				book.libraryID = libraryID;
				LibraryBooks.addLibBook(book).then(function() {
					deferred.resolve();
				}, function(err) {
					deferred.reject(err);
				});
			}



			return deferred.promise;
		},
		updateAsAdmin: function(book) {
			var deferred = $q.defer();

			var updatedBook = new BookResource(book);
			updatedBook._id = book._id;
			updatedBook.$update().then(function() {
				deferred.resolve();
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		}
	};
});
