'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {

    var order   = req.params.order || 'asc',
        field   = req.params.field || '_id',
        page    = req.params.page || 1,
        perPage = req.params.perPage || 10;

    var sortObject = {};
    sortObject[field] = order;

    LibUser.find({libraryID: req.params.id}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
        console.log('ret');
        console.log(err);
        console.log(collection);

        if (err) {
            console.log('Users could not be loaded: ' + err);
        }

        console.log(collection);
        console.log(req.params.id);

        res.send(collection);
    });
};