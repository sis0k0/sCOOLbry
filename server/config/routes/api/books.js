'use strict';

var auth = require('../../auth'),
	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {

	
	// Books
	router.get('/books', controllers.books.getAllBooks);
	router.post('/books', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.createBook);
	router.get('/books/:id', controllers.books.getBookById);
	router.get('/book/sort/:field/:order/:page/:perPage', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.getAllBooksSortable);
	router.get('/book/count', controllers.books.getBookCount);
	router.put('/books', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.updateBook);
	router.get('/book/delete/:id', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.deleteBookById);
	
	router.get('/*', function(req, res) {
		res.status(404);
		res.end();
	});

	app.use('/api/', router);
};