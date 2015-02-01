'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Reading = require('mongoose').model('Reading'),
    Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
        
    var request = req.body;

    LibBook.findOne({libraryID: request.libraryID, bookID: request.bookID}).exec(function(err, book) {
        if(err) {
            console.log('Library book could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else {
            var now = new Date();
            Booking.count({bookID: request.bookID, libraryID: request.libraryID, bookDate: {$gte: now }, userID: {$ne: request.userID} }).exec(function(err, bookingsCount) {
                if(err) {
                    console.log('LibBook could not be loaded ' + err);
                    res.status(503).send('Cannot connect to database');
                } else if(book.available>bookingsCount && book.available>0) {

                    LibBook.update({libraryID: request.libraryID, bookID: request.bookID}, {$inc: {available: -1, given: +1}}, function(err) {
                        if(err) {
                            console.log('Failed to update Library Book: ' + err);
                            res.status(503).send('Cannot connect to database');
                        } else {
                            var now = new Date();
                            Booking.findOneAndRemove({userID: request.userID, bookID: request.bookID, libraryID: request.libraryID, bookDate: {$gte: now}}, function(err, booking) {
                                if (err) {
                                    res.status(503).send('Cannot connect to database');
                                } else {
                                    Reading.create(request, function(err, reader) {
                                        if(err) {
                                            console.log('Failed to add the reading to the library: '+err);
                                            res.status(503).send('Cannot connect to database');
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