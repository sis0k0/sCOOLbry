'use strict';

var Book    = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    // If the library ID is specified - count the libBooks
    if(typeof req.params.libraryID !== 'undefined') {
        LibBook
        .count({libraryID: req.params.libraryID})
        .exec(function(err, count) {
            if(err) {
                return next(new errors.DatabaseError(err, 'Library Books Count'));
            }
            res.send(''+count);
        });
    // Else - count all books
    } else {
        Book
        .count({})
        .exec(function(err, count) {
            if (err) {
                return next(new errors.DatabaseError(err, 'Books Count'));
            }
            res.send(''+count);
        });
    }
};