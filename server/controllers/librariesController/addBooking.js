'use strict';

var Booking = require('mongoose').model('Booking'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    LibBook.findOne({libraryID: req.body.libraryID, bookID: req.body.bookID}).exec(function(err, book) {
        if(err) {
            console.log('LibBook could not be loaded ' + err);
            res.status(503).send('Cannot connect to database');
        } else {
            var now = new Date();
            Booking.count({bookID: req.body.bookID, libraryID: req.body.libraryID, bookDate: {$gte: now } }).exec(function(err, bookingsCount) {
                if(err) {
                    console.log('Bookings count could not be loaded: ' + err);
                    res.status(503).send('Cannot connect to database');
                } else if(book.available>bookingsCount) {

                    Booking.create(req.body, function(err, booking) {
                        if(err) {
                            console.log('Failed to add new booking' + err);
                            res.status(503).send('Cannot connect to database');
                        } else {
                            var socketio = req.app.get('socketio'); // take out socket instance from the app container
                            socketio.sockets.emit(booking.bookID, 'decrease'); // emit an event for all users viewing the book
                            res.send(booking);
                        }
                    });

                } else {
                    res.status('404').send('No available books');
                }
            });
        }

    });
};