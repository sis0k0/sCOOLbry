'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    passport    = require('passport'),
    router      = express.Router();

module.exports = function(app, config) {

    router.get('/is-captcha-enabled', function(req, res) {  res.send(config.captcha); });

    router.get('/users', auth.isInRole('moderator'), controllers.users.getAllUsers);
    router.get('/users/sort/:field/:order/:page/:perPage', auth.isInRole('moderator'), controllers.users.getAllUsersSortable);
    router.get('/users/search/:phrase', auth.isInRole('admin'), controllers.users.getAllUsersSearchable);
    router.get('/userInfo/:id', auth.isAuthenticatedOrInRole('librarian'), controllers.users.getUserById);
    router.get('/user/delete/:id', auth.isInRole('admin'), controllers.users.deleteUserById);

    // Get by short id
    router.get('/user/:id', controllers.users.getUserByShortId);

    // Sign up
    if(config.captcha===false) {
        router.post('/users', controllers.users.createUser);
    }else{
        router.post('/users', controllers.users.validCaptcha, controllers.users.createUser);
    }

    // Create user from panels
    router.post('/librarianCreate', auth.isInRole('libraryOwner'), controllers.users.createLibrarian);
    router.put('/users', auth.isAuthenticatedOrInRole('moderator'), controllers.users.updateUser);

    // Check if available
    router.get('/usernameAvailable/:username', controllers.users.getUserByUsername);
    router.get('/emailAvailable/:email', controllers.users.getUserByEmail);

    // User count
    router.get('/users/count', controllers.users.getUserCount);


    // Passport authentications

    // Facebook
    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));


    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // Twitter
    router.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    
    // Google Plus
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    router.post('/images', controllers.users.uploadAvatar);

    app.use('/api/', router);
};
