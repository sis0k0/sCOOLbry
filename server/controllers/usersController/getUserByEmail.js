'use strict';

var User = require('mongoose').model('User'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    User.findOne({email: req.params.email}).exec(function(err, user) {
        if (err || !user) {
            return next(new errors.DatabaseError(err, 'User'));
        }else{
            res.send(true);
        }
    });
};