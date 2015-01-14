'use strict';

var Reading  = require('mongoose').model('Reading'),
    Booking  = require('mongoose').model('Booking'),
    Book     = require('mongoose').model('Book'),
    User     = require('mongoose').model('User');

module.exports = function(req, res) {

    var history = [];
    User.findOne({_id: req.params.userID}).exec(function(err, user) {
        if (err) {
            console.log('User could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!user) {
            res.status(404).send('User not found');
        } else {

            Reading.find({userID: user._id, returnDate: undefined}).exec(function(err, collection) {
                
                if (err) {
                    console.log('Readings could not be loaded: ' + err);
                    res.status(503).send('Cannot connect to database');
                }

                var readingsCount = collection.length;

                var now = new Date();
                now = Date.now();

                Booking.find({userID: user._id, bookDate: {$gte: now }}).exec(function(err, bookingsCollection) {
                    
                    var bookingsCount = bookingsCollection.length;

                    if(err) {
                        console.log('Readings could not be loaded: ' + err);
                        res.status(503).send('Cannot connect to database.');
                    } else if(bookingsCount<1 && readingsCount<1) {
                        res.send(history);
                    }

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
                });
            });
        }
    });
};