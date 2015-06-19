'use strict';

var LibFines = require('mongoose').model('LibFines'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var order   = req.params.order || 'asc',
        field   = req.params.field || '_id',
        page    = req.params.page || 1,
        perPage = req.params.perPage || 10;
    
    var sortObject = {};
    sortObject[field] = order;
    
    LibFines
    .find(
            {
                libraryID: req.params.libraryID
            },
            null,
            {
                sort: sortObject, limit: perPage, skip: (page-1)*perPage
            }
        )
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library Fines'));
        }

        res.send(collection);
    });
};