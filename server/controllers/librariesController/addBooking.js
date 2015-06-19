'use strict';

var Booking = require('mongoose').model('Booking'),
    LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibBook.findOne({libraryID: req.body.libraryID, bookID: req.body.bookID}).exec(function(err, book) {

        if(err || !book) {
            return next(new errors.DatabaseError(err, 'Library Book'));

        } else {
            var now = new Date();

           
            Booking.count({bookID: req.body.bookID, libraryID: req.body.libraryID, bookDate: {$gte: now } }).exec(function(err, bookingsCount) {
                if(err) {
                    return next(new errors.DatabaseError(err, 'Booking'));

                } else if(book.available>bookingsCount) {

                    Booking.create(req.body, function(err, booking) {
                        if(err) {
                            return next(new errors.DatabaseError(err, 'Booking'));

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