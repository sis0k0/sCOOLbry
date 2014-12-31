'use strict';

var Reading  = require('mongoose').model('Reading'),
	Booking  = require('mongoose').model('Booking'),
	LibVisit = require('mongoose').model('LibVisit'),
	Book     = require('mongoose').model('Book'),
	User     = require('mongoose').model('User');

module.exports = function(req, res) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
 
	var history = [];
	User.findOne({id: req.params.userID}).exec(function(err, user) {
		if (err) {
			console.log('User could not be loaded: ' + err);
			res.status(503).send('Cannot connect to database');
		} else if(!user) {
			res.status(404).send('User not found');
		} else if(typeof user.librarySubscriptions === undefined || user.librarySubscriptions.indexOf(req.params.libraryID)===-1) {
			res.status(401).send('User not subscribed for the library');
		} else {

			var newLibVisitData = {};
			newLibVisitData.libraryID = req.params.libraryID;
			newLibVisitData.userID    = user._id;

			LibVisit.create(newLibVisitData, function(err) {
				if (err) {
					console.log('Failed to register new visit: ' + err);
				}
			});

			Reading.find({userID: user._id, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
				
				if (err) {
					console.log('Readings could not be loaded: ' + err);
					res.status(503).send('Cannot connect to database');
				}

				var readingsCount = collection.length;

				var now = new Date();
				now = Date.now();

				Booking.find({userID: user._id, libraryID: req.params.libraryID, bookDate: {$gte: now }}).exec(function(err, bookingsCollection) {
					
					var bookingsCount = bookingsCollection.length;

					if(err) {
						console.log('Readings could not be loaded: ' + err);
						res.status(503).send('Cannot connect to database.');
					} else if(bookingsCount<1 && readingsCount<1) {
						res.send(history);
					}

					/*jshint loopfunc:true */

					var bookingsAdded = 0,
						readingsAdded = 0;

					for(var i=0; i<readingsCount; i++) {

						Book.findOne({_id: collection[i].bookID}).exec(function(err, book) {
							if (err) {
								console.log('Book could not be loaded: ' + err);
								res.status(503).send('Cannot connect to database');
							} else {
								var reading = new Object({});
								reading.type = 'reading';
								reading.book = book;
								reading.end = collection[readingsCount - history.length - 1 + bookingsAdded].endDate;
								readingsAdded++;

								history.push(reading);

								if(history.length === readingsCount+bookingsCount) {
									res.send(history);
								}
							}
						});
					}
					for(var j=0; j<bookingsCount; j++) {

						Book.findOne({_id: bookingsCollection[j].bookID}).exec(function(err, book) {
							if (err) {
								console.log('Book could not be loaded: ' + err);
								res.status(503).send('Cannot connect to database');
							} else {
								var booking = new Object({});
								booking.type = 'booking';
								booking.book = book;
								booking.end = bookingsCollection[bookingsCount - history.length - 1 + readingsAdded].bookDate;
								bookingsAdded++;

								history.push(booking);

								if(history.length === readingsCount+bookingsCount) {
									res.send(history);
								}
							}
						});
					}
					/*jshint loopfunc:false */

				});

			});

		}
	});

};