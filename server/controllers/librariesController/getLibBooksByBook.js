'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibBook.find({bookID: req.params.id}).exec(function(err, books) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Books'));
        }
        res.send(books);
    });
};