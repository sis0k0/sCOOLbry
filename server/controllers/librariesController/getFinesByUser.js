'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibFines.find({userID: req.params.userID }).exec(function(err, fines) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        }
        res.send(fines);
        
    });
};