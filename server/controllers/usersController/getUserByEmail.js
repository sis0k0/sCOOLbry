'use strict';

var User = require('mongoose').model('User'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    User.findOne({email: req.params.email}).exec(function(err, user) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        } else if (!user) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
};