'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

    var conditions = {};

    conditions.libraryID = req.params.id;
    if(req.params.available===true) {
        conditions.availableBooks = {$gte: 1};
    }

    // Find all available (or not - depends on param) library books, eg. books that are avail at the library at the moment
    LibBook
    .find(conditions)
    .exec(function(err, books) {
        if (err) {
            console.log('LibBook could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(req.params.available === 'true') {
            
            var now = new Date(),
                availableBooks = [];

            // Get all active bookings at the library
            Booking
            .find({libraryID: req.params.id, bookDate: {$gte: now } })
            .exec(function(err, collection) {
                if(err) {
                    console.log('Bookings could not be loaded: ' + err);
                    res.status(503).send('Cannot connect to database');
                }

                // Check how many books are actually available, eg. not booked
                for(var i=0; i<books.length; i++) {
                    var count = 0;
                    for(var j=0; j<collection.length; j++) {
                        if(books[i].bookID === collection[j].bookID && req.params.userID !== collection[j].userID) {
                            count++;
                        }
                    }
                    if(count<books[i].available) {
                        availableBooks.push(books[i]);
                    }
                }
                res.send(availableBooks);

            });

        } else {
            res.send(books);
        }
    });
};