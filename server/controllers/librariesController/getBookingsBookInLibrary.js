'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
    var now = new Date();
    Booking
    .find({bookID: req.params.bookID, libraryID: req.params.libraryID, bookDate: {$gte: now } })
    .exec(function(err, collection) {
        if (err) {
            console.log('Bookings could not be loaded: ' + err);
        }

        res.send(collection);
    });
};