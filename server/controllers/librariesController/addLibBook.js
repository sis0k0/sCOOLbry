'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var book = req.body,
        data = new Object({});

    data.bookID = book._id;
    data.bookISBN = book.isbn;
    data.libraryID = book.libraryID;
    data.bookName = book.title;
    data.total = book.total;
    data.available = book.available;
    data.section = book.section;

    LibBook.create(data, function(err, book){

        if (err) {
            return next(new errors.DatabaseError(err, 'Library Book'));
        }
        res.send(book);
    });
};