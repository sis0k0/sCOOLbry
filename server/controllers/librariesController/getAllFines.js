'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
  
    LibFines.find({libraryID: req.params.libraryID}).exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        }
        res.send(collection);

    });
};