'use strict';

var auth    = require('../auth'),
    express = require('express'),
    router  = express.Router(),
    path    = require('path');

module.exports = function(app) {

    router.post('/login', auth.login);
    router.post('/loginNoCaptcha', auth.loginNoCaptcha);
    router.post('/logout', auth.logout);


    // Partials ----------------------------------------------
    router.get('/partials/*', function(req, res) {

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

    router.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });


    app.use('/', router);
};
