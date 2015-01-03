'use strict';

var Booking = require('mongoose').model('Booking'),
	LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	LibBook.findOne({libraryID: req.body.libraryID, bookID: req.body.bookID}).exec(function(err, book) {
		if (err) {
			console.log('LibBook could not be loaded: ' + err);
			res.status(503).send('Cannot connect to database');
		} else if(book.available>0) {

			book.booked++;
			book.available--;

			LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, book, function(err) {

				if(err) {
					console.log('LibBook could not be updated' + err);
					res.status(503).send('Cannot connect to database');
				} else {
					Booking.create(req.body, function(err, booking) {
						if (err) {
							console.log('Failed to add new booking: ' + err);
							res.status(503).send('Cannot connect to database');
						}
						res.send(booking);
					});
				}
			});

		} else {
			res.status('404').send('No available books');
		}
	});
};