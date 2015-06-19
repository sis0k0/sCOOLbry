'use strict';

var Booking = require('mongoose').model('Booking'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var now = new Date();
    
    Booking
    .count({libraryID: req.params.libraryID, bookDate: {$gte: now } })
    .exec(function(err, count) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Bookings count'));
        }

        res.send('' + count);
    });

};