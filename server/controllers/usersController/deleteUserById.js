'use strict';

var User    = require('mongoose').model('User'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    User.remove({_id: req.params.id}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        }else{
            res.send('true');
        }
    });
};