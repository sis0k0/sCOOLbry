'use strict';

var auth = require('../../auth'),
	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {

	// Libraries
	router.get('/libraries', controllers.libraries.getAllLibraries);
	router.get('/libraries/:id', controllers.libraries.getLibraryById);
	router.get('/library/books/:id', controllers.libraries.getLibraryBooksById);
	router.get('/library/book/:id', controllers.libraries.getLibBookById);
	router.put('/library/book', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.updateLibBook);
	router.get('/library/users/:id/:field/:order/:page/:perPage', controllers.libraries.getLibraryUsersById);
	router.get('/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
	router.get('/library/count', controllers.libraries.getLibraryCount);
	router.get('/library/user-count', controllers.libraries.getLibraryUsersCount);
	router.put('/libraries', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.updateLibrary);
	router.get('/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);
	router.post('/library/add-user', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.addLibraryUser);
	router.get('/library/delete-user/:id', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.deleteLibraryUser);

	/*router.get('/*', function(req, res) {
		console.log(req);
		res.status(404);
		res.end();
	});*/

	app.use('/api/', router);
};
