'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    
    LibFines
    .count({libraryID: req.params.libraryID })
    .exec(function(err, count) {

        if(err) {
            return next(new errors.DatabaseError(err, 'Library Fines Count'));
        }

        res.send('' + count);
    });

};