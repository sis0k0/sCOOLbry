'use strict';

var Notification = require('mongoose').model('Notification'),
    errors       = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    Notification
    .find({userID: req.params.id})
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Notification'));
        }else{
            res.send(collection);
        }
    });
};