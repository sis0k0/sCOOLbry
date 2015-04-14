'use strict';

var User = require('mongoose').model('User');

module.exports = function(req, res) {
    User.count({}).exec(function(err, collection) {
        if (err) {
            console.log('Users could not be loaded: ' + err);
        }

        res.send(''+collection);
    });
};