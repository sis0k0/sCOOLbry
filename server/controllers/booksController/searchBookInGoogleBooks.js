'use strict';

var books   = require('google-books-search'),
	options = {
		field: 'isbn',
		offset: 0,
		limit: 1,
		type: 'books'
	};


module.exports = function(req, res) {

	var isbn = req.params.isbn;
	isbn = isbn.replace(/-/gi, '');

	// Check the country code of the books for performing language-specific search
	var countryCode = '';
	if(isbn.length===13) {
		countryCode = isbn.substring(0,6);
	} else {
		countryCode = '978' + isbn.substring(0,3);
	}

	// Only the bulgarian language is specified, because of the current needs of the application
	if(countryCode==='978619' || countryCode==='978954') {
		options.lang = 'bg';
	} else {
		options.lang = 'en';
	}

	books.search(isbn, options, function(error, results) {
		if (!error && results.length>0) {



			// Make a book object that has properties, analogous to the app's Book Model
			var resultsObject = results[0];
			var book = {};

			if(resultsObject.hasOwnProperty('authors')) {
				if(resultsObject.authors.length>0) {
					book.author = resultsObject.authors.join(',');
				}
			}

			if(resultsObject.hasOwnProperty('categories')) {
				book.themes = [];
				for(var i=0; i<resultsObject.categories.length; i++) {
					book.themes.push(resultsObject.categories[i]);
				}
			}

			book.language = options.lang;

			if(resultsObject.hasOwnProperty('pageCount')) {
				book.pages = resultsObject.pageCount;
			}

			if(resultsObject.hasOwnProperty('publishedDate')) {
				book.published = resultsObject.publishedDate;
			}

			if(resultsObject.hasOwnProperty('publisher')) {
				book.publisher = resultsObject.publisher;
			}

			if(resultsObject.hasOwnProperty('thumbnail')) {
				book.cover = resultsObject.thumbnail;
			}

			if(resultsObject.hasOwnProperty('title')) {
				book.title = resultsObject.title;
			}

			res.send(book);
		} else {
			res.send(false);
		}
	});

};