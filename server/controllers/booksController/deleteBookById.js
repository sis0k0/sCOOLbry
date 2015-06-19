'use strict';

var Book    = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');


module.exports = function(req, res, next) {

    // First remove the book instance in the libraries
    LibBook.remove({bookID: req.params.id}, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Library Book'));
        } else {

            // Then remove the book itself
            Book.remove({_id: req.params.id}, function(err) {
                if(err) {
                    return next(new errors.DatabaseError(err, 'Book'));
                } else {
                    res.send('true');
                }
            });
        }
    });

};