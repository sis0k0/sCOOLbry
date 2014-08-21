var auth = require('./auth'),
    controllers = require('../controllers'),
    express = require('express');
    router = express.Router();

module.exports = function(app) {
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
   
    
    router.get('/api/libraries', controllers.libraries.getAllLibraries);
    router.get('/api/libraries/:id', controllers.libraries.getLibraryById);
	router.get('/api/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
    router.get('/api/library/count', controllers.libraries.getLibraryCount);
    router.put('/api/libraries', auth.isAuthenticatedOrAdmin, controllers.libraries.updateLibrary);
    router.get('/api/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);
    
    router.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/views/' + req.params.partialArea + '/' + req.params.partialName)
    });

    router.post('/login', auth.login);
    router.post('/logout', auth.logout);

    router.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    })

    router.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });

    app.use('/', router);
}
