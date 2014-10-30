'use strict';

app.factory('Book', function($q, $http, BookResource) {
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
		},
		findBook: function(isbn) {
			var deferred = $q.defer();
			var foundBook = {};

			var findInDatabasePromise = $http.get('/api/book/findByISBN/' + isbn);
			findInDatabasePromise
				.success(function(data) {
					if(data!=='false') {
						console.log(data);
						foundBook = data;
					} else {
						console.log('not found!');
					}
				});


			var scrapBgBooksInPrintPromise = $http.get('/api/book/booksinprint/' + isbn);
			scrapBgBooksInPrintPromise
				.success(function(data) {
					if(data!=='false') {
						console.log('found');
						console.log(data);
						foundBook = data;
					} else {
						console.log('not found!');
					}
				});

			var findInAmazonPromise = $http.get('/api/book/amazonSearch/' + isbn);
			findInAmazonPromise
				.success(function(data) {
					if(data!=='false') {
						console.log('found');
						console.log(data);
						foundBook = data;
					} else {
						console.log('not found!');
					}
				});


		}
	};
});
