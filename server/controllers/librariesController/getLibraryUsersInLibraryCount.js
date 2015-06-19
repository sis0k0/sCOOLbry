'use strict';

var LibUser = require('mongoose').model('LibUser'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    LibUser.count({libraryID: req.params.libraryID}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Users Count'));
        }

        res.send('' + collection);
    });
};