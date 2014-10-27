'use strict';

var auth = require('../../auth'),
	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {
	
	// Books
	router.get('/books', controllers.books.getAllBooks);
	router.post('/books', auth.isInRole('librarian'), controllers.books.createBook);
	router.get('/books/:id', controllers.books.getBookById);
	router.get('/book/sort/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.books.getAllBooksSortable);
	router.get('/book/count', controllers.books.getBookCount);
	router.put('/books', auth.isInRole('librarian'), controllers.books.updateBook);
	router.get('/book/delete/:id', auth.isInRole('librarian'), controllers.books.deleteBookById);
	router.get('/book/delete2/:id', auth.isInRole('librarian'), controllers.books.deleteBookFromLibraryById);

	app.use('/api/', router);
};
