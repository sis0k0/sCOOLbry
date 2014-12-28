'use strict';

var Reading = require('mongoose').model('Reading'),
	Booking = require('mongoose').model('Booking'),
	Book    = require('mongoose').model('Book'),
	User    = require('mongoose').model('User');

module.exports = function(req, res) {
 
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
 
	var history = [];
	User.findOne({id: req.params.userID}).exec(function(err, user) {
		console.log(err);
		console.log(user);
		if (err || !user) {
			console.log(user);
			console.log(req.params.userID);
			res.send('User cannot be found.');
			
		}else{

			Reading.find({userID: user._id, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
				
				console.log(collection);
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

				Booking.find({userID: user._id, libraryID: req.params.libraryID, bookDate: {$gte: now }}).exec(function(err, bookingsCollection) {
					
					console.log(collection);
					console.log(bookingsCollection);
					if(err || (collection.length<1 && bookingsCollection.length<1)) {
						console.log('Bookings and Readings could not be loaded: ' + err);
						res.send('No bookings and readings in this library.');
					}

					/*jshint loopfunc:true */
					for(var i=0; i<bookingsCollection.length; i++) {

						Book.findOne({_id: bookingsCollection[i].bookID}).exec(function(err, book) {
							if (err) {
								console.log('Book could not be loaded: ' + err);
							} else {
								var booking = new Object({});
								booking.type = 'booking';
								booking.book = book;
								booking.end = bookingsCollection[bookingsCollection.length - history.length - 1 + readingsCount].bookDate;

								history.push(booking);

								if(book._id.toString()===bookingsCollection[bookingsCollection.length-1].bookID.toString()) {
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