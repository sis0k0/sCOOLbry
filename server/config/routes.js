var auth = require('./auth'),
    controllers = require('../controllers'),
    express = require('express');
    router = express.Router();

module.exports = function(app) {
    router.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    router.post('/api/users', controllers.users.createUser);
    router.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    router.post('/api/images', function(req, res) {
     
        var serverPath = '/images/' + req.fd.uploadedFile.name;
     
        require('fs').rename(
        req.fd.uploadedFile.name,
        'public/app/users/' + serverPath,
        function(error) {
                if(error) {
            res.send({
                        error: 'Ah crap! Something bad happened'
            });
                    return;
                }
     
                res.send({
            path: serverPath
                });
        }
        );
    });







    router.get('/api/courses', controllers.courses.getAllCourses);
    router.get('/api/courses/:id', controllers.courses.getCourseById);

    router.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
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