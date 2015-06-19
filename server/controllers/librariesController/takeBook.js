'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Reading = require('mongoose').model('Reading'),
    Booking = require('mongoose').model('Booking'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    var request = req.body;

    LibBook.findOne({libraryID: request.libraryID, bookID: request.bookID}).exec(function(err, book) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Library Books'));
        } else {
            var now = new Date();
            Booking.count({bookID: request.bookID, libraryID: request.libraryID, bookDate: {$gte: now }, userID: {$ne: request.userID} }).exec(function(err, bookingsCount) {
                if(err) {
                    return next(new errors.DatabaseError(err, 'Bookings Count'));
                } else if(book.available>bookingsCount && book.available>0) {

                    LibBook.update({libraryID: request.libraryID, bookID: request.bookID}, {$inc: {available: -1, given: +1}}, function(err) {
                        if(err) {
                            return next(new errors.DatabaseError(err, 'Library Book'));
                        } else {
                            var now = new Date();
                            Booking.findOneAndRemove({userID: request.userID, bookID: request.bookID, libraryID: request.libraryID, bookDate: {$gte: now}}, function(err, booking) {
                                if (err) {
                                    return next(new errors.DatabaseError(err, 'Booking'));
                                } else {
                                    Reading.create(request, function(err, reader) {
                                        if(err) {
                                            return next(new errors.DatabaseError(err, 'Reading'));
                                        } else {
                                            if(!booking) {
                                                var socketio = req.app.get('socketio'); // take out socket instance from the app container
                                                socketio.sockets.emit(request.bookID, 'decrease'); // emit an event for all users viewing the book
                                            }
                                            res.send(reader);
                                        }
                                    });
                                }
                            });
                        }
                    });

                } else {
                    res.status('404').send('No available books');
                }
            });
        }

    });



};