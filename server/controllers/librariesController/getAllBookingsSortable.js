'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

    var order   = req.params.order || 'asc',
        field   = req.params.field || '_id',
        page    = req.params.page || 1,
        perPage = req.params.perPage || 10;
    
    var sortObject = {};
    sortObject[field] = order;
    var now = new Date();
    
    Booking
    .find(
            {
                bookDate: {$gte: now },
                libraryID: req.params.libraryID
            },
            null,
            {
                sort: sortObject, limit: perPage, skip: (page-1)*perPage
            }
        )
    .exec(function(err, collection) {
        if (err) {
            console.log('Bookings could not be loaded: ' + err);
        }

        res.send(collection);
    });
};