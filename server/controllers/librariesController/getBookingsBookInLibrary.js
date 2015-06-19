'use strict';

var Booking = require('mongoose').model('Booking'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var now = new Date();
    Booking
    .find({bookID: req.params.bookID, libraryID: req.params.libraryID, bookDate: {$gte: now } })
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Bookings'));
        }

        res.send(collection);
    });
};