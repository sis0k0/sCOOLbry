'use strict';

var User   = require('mongoose').model('User'),
    errors = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    console.log(req.accepts());
    User.count({}).exec(function(err, count) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Users count'));
        }
        res.send(''+count);
    });
};