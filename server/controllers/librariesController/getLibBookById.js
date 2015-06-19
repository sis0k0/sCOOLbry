'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    LibBook.findOne({_id: req.params.id}).exec(function(err, book) {

        if (err || !book) {
            return next(new errors.DatabaseError(err, 'Library Books'));
        } else {
            res.send(book);
        }
    });
};