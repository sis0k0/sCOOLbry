'use strict';

var LibUser = require('mongoose').model('LibUser'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    LibUser.remove({userID: req.params.id, libraryID: req.params.libraryID}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library User'));
        }else{
            res.send('true');
        }
    });

};