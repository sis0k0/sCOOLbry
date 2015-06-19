'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Booking = require('mongoose').model('Booking'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    LibBook.findOne({libraryID: req.params.libraryID, bookID: req.params.bookID}).exec(function(err, book) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Books'));
        }

        var now = new Date();
        var freeBooks;
        Booking.count({bookID: req.params.bookID, libraryID: req.params.libraryID, bookDate: {$gte: now } }).exec(function(err, count) {
            if(err) {
                console.log(err);
            }

            freeBooks=book.available - count;
            if(freeBooks>0) {
                res.send(true);
            }else{
                res.send(false);
            }
        });

    });
};