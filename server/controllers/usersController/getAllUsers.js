'use strict';

var User    = require('mongoose').model('User'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    User.find({}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        }
        res.send(collection);
    });
};