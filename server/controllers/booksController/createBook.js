'use strict';

var Book        = require('mongoose').model('Book'),
    BookService = require('../../services/BookService'),
    errors      = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    // Get book data from the request body
    var newBookData = req.body;
    for(var prop in newBookData) {
        if(typeof newBookData[prop] === 'string') {
            newBookData[prop] = newBookData[prop].trim();
        }
        if(!newBookData[prop]) {
            delete newBookData[prop];
        }
    }

    Book.create(newBookData, function(err, book) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Book'));
        }

        // Add book content to the database if it's available
        if(book.ebookUrl) {
            BookService.indexEbook(book._id, book.ebookUrl, function(err) {
                if(err) {
                    return next(new errors.DatabaseError(err, 'Book Content Index'));
                }
                res.send(book);
            });
        }

    });
};