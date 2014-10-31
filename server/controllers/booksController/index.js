'use strict';

module.exports = {

	createBook: require('./createBook'),

	updateBook: require('./updateBook'),

	deleteBookById: require('./deleteBookById'),

	deleteBookFromLibraryById: require('./deleteBookFromLibraryById'),

	getAllBooks: require('./getAllBooks'),

	getAllBooksSortable: require('./getAllBooksSortable'),

	getBookCount: require('./getBookCount'),

	getBookById: require('./getBookById'),

	getBookByISBN: require('./getBookByISBN'),

	scrapBookByISBN: require('./scrapBookByISBN'),

	searchBookInAmazon: require('./searchBookInAmazon'),

	searchBookInGoogleBooks: require('./searchBookInGoogleBooks')

};