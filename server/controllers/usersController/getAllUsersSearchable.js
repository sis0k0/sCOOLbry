'use strict';

var User    = require('mongoose').model('User'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    User
    .find(
            { 
                $or: [ 
                    {username: new RegExp(req.params.phrase, 'i')},
                    {firstName: new RegExp(req.params.phrase, 'i')},
                    {lastName: new RegExp(req.params.phrase, 'i')},
                    {email: new RegExp(req.params.phrase, 'i')} 
                ] 
            }
        )
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        }
        res.send(collection);
    });
};