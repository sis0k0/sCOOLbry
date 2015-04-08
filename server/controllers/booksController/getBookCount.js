'use strict';

var Book    = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    // If the library ID is specified - count the libBooks
    if(typeof req.params.libraryID !== 'undefined') {
        LibBook
        .count({libraryID: req.params.libraryID})
        .exec(function(err, count) {
            if(err) {
                console.log('Books could not be counted: ' + err);
            }
            res.send(count);
        });
    // Else - count all books
    } else {
        Book
        .count({})
        .exec(function(err, count) {
            if (err) {
                console.log('Books could not be counted: ' + err);
            }
            res.send(''+count);
        });
    }
};