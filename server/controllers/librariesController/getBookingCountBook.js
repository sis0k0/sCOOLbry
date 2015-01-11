'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
    var now = new Date();
    Booking.count({bookID: req.params.bookID, libraryID: req.params.libraryID, bookDate: {$gte: now } }).exec(function(err, count) {
        if(err) {
            console.log(err);
        }

        res.send('' + count);
    });

};