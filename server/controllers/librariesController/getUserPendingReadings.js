'use strict';

var Reading = require('mongoose').model('Reading'),
	Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

	var history = [];

	Reading.find({userID: req.params.userID, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
		if (err) {
			console.log('Readings could not be loaded: ' + err);
		}

		history = history.concat(collection);

		var now = new Date();
		now = Date.now();
		console.log(now);


		Booking.find({userID: req.params.userID, libraryID: req.params.libraryID, bookDate: {$gte: now }}).exec(function(err, collection) {
			if(err) {
				console.log('Bookings could not be loaded: ' + err);
			}
			history = history.concat(collection);
			res.send(history);
		});

	});



};