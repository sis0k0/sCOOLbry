'use strict';

module.exports = {

	createBook: require('./createBook'),
	createFavouriteBook: require('./createFavouriteBook'),
	deleteBookById: require('./deleteBookById'),
	deleteFavouriteBookById: require('./deleteFavouriteBookById'),
	deleteBookFromLibraryById: require('./deleteBookFromLibraryById'),
	getAllBooks: require('./getAllBooks'),
	getAllBooksSortable: require('./getAllBooksSortable'),
	getAllBooksSearchable: require('./getAllBooksSearchable'),
	getBookById: require('./getBookById'),
	getBookByISBN: require('./getBookByISBN'),
	getBookCount: require('./getBookCount'),
	getFavouriteBooks: require('./getFavouriteBooks'),
	getFavouriteBooksInLibrary: require('./getFavouriteBooksInLibrary'),
	isFavourite: require('./isFavourite'),
	scrapBookByISBN: require('./scrapBookByISBN'),
	searchBookInAmazon: require('./searchBookInAmazon'),
	searchBookInGoogleBooks: require('./searchBookInGoogleBooks'),
	updateBook: require('./updateBook')

};