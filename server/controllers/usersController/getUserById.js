'use strict';

var User   = require('mongoose').model('User'),
    errors = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    User.findOne({_id: req.params.id}).exec(function(err, user) {
        if (err || !user) {
            return next(new errors.DatabaseError(err, 'User'));
        } else {
            res.send(user);
        }
    });
};