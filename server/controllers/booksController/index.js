'use strict';

module.exports = {

	createBook: require('./createBook'),
	deleteBookById: require('./deleteBookById'),
	deleteBookFromLibraryById: require('./deleteBookFromLibraryById'),
	getAllBooks: require('./getAllBooks'),
	getAllBooksSortable: require('./getAllBooksSortable'),
	getBookById: require('./getBookById'),
	getBookByISBN: require('./getBookByISBN'),
	getBookCount: require('./getBookCount'),
	scrapBookByISBN: require('./scrapBookByISBN'),
	searchBookInAmazon: require('./searchBookInAmazon'),
	searchBookInGoogleBooks: require('./searchBookInGoogleBooks'),
	updateBook: require('./updateBook')

};