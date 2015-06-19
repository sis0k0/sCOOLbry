'use strict';

var Reading = require('mongoose').model('Reading'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    Reading.find({userID: req.params.userID, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Readings'));
        }

        res.send(collection);
    });
};