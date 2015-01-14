'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

    var conditions = ({});
    conditions.libraryID = req.params.id;

    if(req.params.available === 'true') {
        conditions.available = ({$gte: 1});
    }


    LibBook.find(conditions).exec(function(err, books) {
        if (err) {
            console.log('LibBook could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(req.params.available === 'true') {
            var now = new Date(),
                availableBooks = [];

            Booking.find({libraryID: req.params.id, bookDate: {$gte: now } }).exec(function(err, collection) {
                if(err) {
                    console.log('Bookings could not be loaded: ' + err);
                    res.status(503).send('Cannot connect to database');
                }

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