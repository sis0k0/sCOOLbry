'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibFines.findOne({_id: req.params.id}).exec(function(err, fines) {
        if (err || !fines) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        } else {
            res.send(fines);
        }
    });
};