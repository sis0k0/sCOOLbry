'use strict';

app.factory('Book', function($q, BookResource) {
	return {
		addBook: function(book, libraryID) {
			var deferred = $q.defer();
			if(typeof libraryID !== undefined) {
				book.libraryID = libraryID;
			}
			
			var newBook = new BookResource(book);
			newBook.$save().then(function() {
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
		}
	};
});
