'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibBook.findOne({libraryID: req.params.libraryID, bookID: req.params.bookID}).exec(function(err, book) {
        if (err || !book) {
            return next(new errors.DatabaseError(err, 'Library Book'));
        } else {
            res.send(book);
        }
    });
};