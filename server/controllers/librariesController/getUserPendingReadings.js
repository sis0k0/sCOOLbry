'use strict';

var Reading = require('mongoose').model('Reading'),
	Booking = require('mongoose').model('Booking'),
	Book    = require('mongoose').model('Book');

module.exports = function(req, res) {

	var history = [];

	Reading.find({userID: req.params.userID, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
		if (err) {
			console.log('Readings could not be loaded: ' + err);
		}

		/*jshint loopfunc:true */
		for(var i=0; i<collection.length; i++) {

			Book.findOne({_id: collection[i].bookID}).exec(function(err, book) {
				if (err) {
					console.log('Book could not be loaded: ' + err);
				} else {
					var reading = new Object({});
					reading.type = 'reading';
					reading.book = book;
					reading.end = collection[collection.length - history.length - 1].endDate;

					history.push(reading);
				}
			});
		}
		/*jshint loopfunc:false */

		var readingsCount = collection.length;
		var now = new Date();
		now = Date.now();

		Booking.find({userID: req.params.userID, libraryID: req.params.libraryID, bookDate: {$gte: now }}).exec(function(err, collection) {
			if(err) {
				console.log('Bookings could not be loaded: ' + err);
			}

			/*jshint loopfunc:true */
			for(var i=0; i<collection.length; i++) {

				Book.findOne({_id: collection[i].bookID}).exec(function(err, book) {
					if (err) {
						console.log('Book could not be loaded: ' + err);
					} else {
						var booking = new Object({});
						booking.type = 'booking';
						booking.book = book;
						booking.end = collection[collection.length - history.length - 1 + readingsCount].bookDate;

						history.push(booking);

						if(book._id.toString()===collection[collection.length-1].bookID.toString()) {
							res.send(history);
						}
					}
				});
			}
			/*jshint loopfunc:false */

		});

	});
};