'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    var conditions = {};
    conditions.libraryID = req.params.id;

    if(req.params.available === 'true') {
        conditions.available = ({$gte: 1});
    }

    var order   = req.params.order || 'asc',
        field   = req.params.field || '_id',
        page    = req.params.page || 1,
        perPage = req.params.perPage || 10;

    var sortObject = {};
    sortObject[field] = order;

    LibBook.find(conditions, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, books) {
        if (err) {
            console.log('LibBook could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else {
            res.send(books);
        }
    });
};