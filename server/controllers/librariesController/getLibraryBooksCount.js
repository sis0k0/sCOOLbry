'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    LibBook.count({libraryID: req.params.id}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Books Count'));
        }

        res.send(''+collection);
    });
};