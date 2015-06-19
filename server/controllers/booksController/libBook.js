'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibBook.remove({_id: req.params.id}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Book'));
        } else {
            res.send('true');
        }
    });

};