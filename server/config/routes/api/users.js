'use strict';

var auth        = require('../../auth'),
	controllers = require('../../../controllers'),
	express     = require('express'),
	passport    = require('passport'),
	router      = express.Router();

module.exports = function(app, config) {

	router.get('/is-captcha-enabled', function(req, res) {  res.send(config.captcha); });

	router.get('/users', auth.isInRole('admin'), controllers.users.getAllUsers);
	router.get('/users/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.users.getAllUsersSortable);
	router.get('/users/search/:phrase', auth.isInRole('admin'), controllers.users.getAllUsersSearchable);
	router.get('/userInfo/:id', auth.isInRole('librarian'), controllers.users.getUserById);
	router.get('/user/delete/:id', auth.isInRole('admin'), controllers.users.deleteUserById);

	router.get('/user/:id', controllers.users.getUserByShortId);


	if(config.captcha===false) {
		router.post('/users', controllers.users.createUser);
	}else{
		router.post('/users', controllers.users.validCaptcha, controllers.users.createUser);
	}

	router.post('/librarianCreate', auth.isInRole('admin'), controllers.users.createLibrarian);
	router.put('/users', controllers.users.updateUser);
	router.get('/usernameTaken/:username', controllers.users.getUserByUsername);
	router.get('/emailTaken/:email', controllers.users.getUserByEmail);
	router.get('/users/count', controllers.users.getUserCount);
	router.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['email']
	}));


	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	router.get('/auth/twitter', passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
	router.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	router.post('/images', controllers.users.uploadAvatar);

	app.use('/api/', router);
};
