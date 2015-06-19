'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var now = new Date();

    var paidObject = {
        paid: now
    };

    var updatedId = req.params.id;
    
    LibFines.update({_id: updatedId}, paidObject, {runValidators: true}, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        }
        res.end();
    });
};