'use strict';

var auth = require('./auth'),
	controllers = require('../controllers'),
	filters = require('../filters'),
	express = require('express'),
	router = express.Router(),
	path = require('path');

module.exports = function(app) {

	// Controllers -----------------------------------
	// Users
	router.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
	router.get('/api/users/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.users.getAllUsersSortable);
	router.get('/api/users/search/:phrase', auth.isInRole('admin'), controllers.users.getAllUsersSearchable);
	router.get('/api/userInfo/:id', auth.isInRole('admin'), controllers.users.getUserById);
	router.get('/api/user/delete/:id', auth.isInRole('admin'), controllers.users.deleteUserById);
	router.post('/api/users', controllers.users.validCaptcha, controllers.users.createUser);
	router.put('/api/users', auth.isAuthenticatedOrAdmin, controllers.users.updateUser);
	router.get('/api/usernameTaken/:username', controllers.users.getUserByUsername);
	router.get('/api/emailTaken/:email', controllers.users.getUserByEmail);
	router.get('/api/users/count', controllers.users.getUserCount);

	router.post('/api/images', auth.isAuthenticated, controllers.users.uploadAvatar);
   
	// Libraries
	router.get('/api/libraries', controllers.libraries.getAllLibraries);
	router.get('/api/libraries/:id', controllers.libraries.getLibraryById);
	router.get('/api/library/books/:id', controllers.libraries.getLibraryBooksById);
	router.get('/api/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
	router.get('/api/library/count', controllers.libraries.getLibraryCount);
	router.put('/api/libraries', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.libraries.updateLibrary);
	router.get('/api/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);
	
	// Books
	router.get('/api/books', controllers.books.getAllBooks);
	router.post('/api/books', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.createBook);
	router.get('/api/books/:id', controllers.books.getBookById);
	router.get('/api/book/sort/:field/:order/:page/:perPage', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.getAllBooksSortable);
	router.get('/api/book/count', controllers.books.getBookCount);
	router.put('/api/books', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.updateBook);
	router.get('/api/book/delete/:id', auth.isInRole('admin', 'librarian', 'libraryOwner'), controllers.books.deleteBookById);
	
	// Filters -----------------------------------------------

	// Users roles
	router.get('/api/roles', filters.roles.getAllRoles);

    // Genres
	router.get('/api/genres', filters.genres.getAllGenres);

	// Login/Logout ------------------------------------------

	router.post('/login', auth.login);
	router.post('/logout', auth.logout);


	// Partials ----------------------------------------------
	router.get('/partials/*', function(req, res) {
		console.log(req.params[0]);
		var requestedView = path.join('../../public/views', req.params[0]);

		res.render(requestedView, function(err, html) {
			if(err) {
				res.send('<h1>Page not found.</h1>', 404);
			}
			else {
				res.send(html);
			}
		});
	});

	

	router.get('/api/*', function(req, res) {
		res.status(404);
		res.end();
	});

	router.get('*', function(req, res) {
		res.render('index', {currentUser: req.user});
	});

	app.use('/', router);
};
