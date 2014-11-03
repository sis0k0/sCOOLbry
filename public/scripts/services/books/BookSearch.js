'use strict';

app.factory('bookSearch', function($q, $http) {
	return {

		search: function(isbn) {

			// Promise to be resolved if the book is found
			// When the promise is resolved by some request, all other requests are cancelled
			var deferred = $q.defer();

			// Make promise array that holds all http requests
			var promisesArray = [];

			// Get the country code of the book for performing specific country-based requests
			var isbnJustNumber = isbn.replace(/-/gi, '');
			var countryCode = '';
			if(isbnJustNumber.length===13) {
				countryCode = isbnJustNumber.substring(0,6);
			} else {
				countryCode = '978' + isbnJustNumber.substring(0,3);
			}

			// If the book is bulgarian, perform web scrapping of the Bulgarian national register
			if(countryCode==='978619' || countryCode==='978954') {

				// Make http request for scrapping booksinprint.bg
				var scrapBgBooksInPrintPromise = $http.get('/api/book/booksinprint/' + isbn, {timeout: deferred.promise});
				promisesArray.push(scrapBgBooksInPrintPromise);
				scrapBgBooksInPrintPromise.success(function(data) {
					if(data!=='false') {
						deferred.resolve(data);
					} else {
						console.log('scrapping not found');
					}
				});
			}


			// Make http request to our database
			// var findInDatabasePromise = $http.get('/api/book/findByISBN/' + isbn, {timeout: deferred.promise});
			// promisesArray.push(findInDatabasePromise);
			// findInDatabasePromise.success(function(data) {
			// 	if(data!=='false') {
			// 		deferred.resolve(data);
			// 	} else {
			// 		console.log('database not found');
			// 	}
			// });

			// Make http request to the Amazon API, implemented within our server side
			var findInAmazonPromise = $http.get('/api/book/amazonSearch/' + isbn, {timeout: deferred.promise});
			promisesArray.push(findInAmazonPromise);
			findInAmazonPromise.success(function(data) {
				if(data!=='false' || data!==false) {
					console.log(data);
					deferred.resolve(data);
				} else {
					console.log('amazon not found');
				}
			});

			// Make http request to the Google Books API, implemented within our server side
			var findInGoogleBooksPromise = $http.get('/api/book/googleBooksSearch/' + isbn, {timeout: deferred.promise});
			promisesArray.push(findInGoogleBooksPromise);
			findInGoogleBooksPromise.success(function(data) {
				if(data!=='false') {
					deferred.resolve(data);
				} else {
					console.log('google not found');
				}
			});

			// If all http requests are finished and the promise is still not resolved,
			// then the book is not found and we reject the promise.
			$q.all(promisesArray)
				.then(function(results) {
					deferred.reject('Not found');
				});

			// We return the promise, so that the controller has access to its state
			return deferred.promise;


		}
	};
});