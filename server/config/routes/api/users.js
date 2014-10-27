'use strict';

var auth = require('../../auth'),
	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {

	router.get('/users', auth.isInRole('admin'), controllers.users.getAllUsers);
	router.get('/users/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.users.getAllUsersSortable);
	router.get('/users/search/:phrase', auth.isInRole('admin'), controllers.users.getAllUsersSearchable);
	router.get('/userInfo/:id', auth.isInRole('librarian'), controllers.users.getUserById);
	router.get('/user/delete/:id', auth.isInRole('admin'), controllers.users.deleteUserById);
	router.post('/users', controllers.users.validCaptcha, controllers.users.createUser);
	router.post('/librarianCreate', auth.isInRole('admin'), controllers.users.createLibrarian);
	router.put('/users', auth.isAuthenticatedOrAdmin, controllers.users.updateUser);
	router.get('/usernameTaken/:username', controllers.users.getUserByUsername);
	router.get('/emailTaken/:email', controllers.users.getUserByEmail);
	router.get('/users/count', controllers.users.getUserCount);

	router.post('/images', auth.isAuthenticated, controllers.users.uploadAvatar);

	app.use('/api/', router);
};
