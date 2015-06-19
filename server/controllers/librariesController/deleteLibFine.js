'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    LibFines.remove({_id: req.params.id}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        }else{
            res.send('true');
        }

    });
};