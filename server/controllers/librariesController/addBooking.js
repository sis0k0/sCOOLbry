'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
	var newBookingData = req.body;
	
	Booking.create(newBookingData, function(err, booking) {
		if (err) {
			console.log('Failed to add new booking: ' + err);
			return;
		}
		console.log(booking);
		res.send(booking);
	});
};