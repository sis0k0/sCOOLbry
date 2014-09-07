'use strict';

var auth = require('../auth'),
	controllers = require('../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {


	// Libraries
	router.get('/libraries', controllers.libraries.getAllLibraries);
	router.get('/libraries/:id', controllers.libraries.getLibraryById);
	router.get('/library/books/:id', controllers.libraries.getLibraryBooksById);
	router.get('/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
	router.get('/library/count', controllers.libraries.getLibraryCount);
	router.put('/libraries', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.updateLibrary);
	router.get('/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);

	router.get('/*', function(req, res) {
		res.status(404);
		res.end();
	});

	app.use('/api/', router);
};