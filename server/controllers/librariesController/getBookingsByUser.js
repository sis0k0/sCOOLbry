'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
    var now = new Date();
    Booking.find({userID: req.params.userID, bookDate: {$gte: now } }).exec(function(err, collection) {

        if (err) {
            console.log('Bookings could not be loaded: ' + err);
        }


        
    	console.log(collection);
        res.send(collection);
    });
};