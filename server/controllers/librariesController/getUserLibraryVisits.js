'use strict';

var LibVisit = require('mongoose').model('LibVisit'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibVisit.find({userID: req.params.userID}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Visist'));
        }
        res.send(collection);
    });
};