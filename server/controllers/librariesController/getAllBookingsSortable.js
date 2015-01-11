'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

    var order, field, page, perPage;

    if(req.params.order===undefined) {
        order = 'asc';
    }else{
        order = req.params.order;
    }
    
    if(req.params.field===undefined) {
        field = '_id';
    }else{
        field = req.params.field;
    }
    
    if(req.params.page===undefined) {
        page = 1;
    }else{
        page = req.params.page;
    }
    
    if(req.params.perPage===undefined) {
        perPage = 10;
    }else{
        perPage = req.params.perPage;
    }
    
    var sortObject = {};
    sortObject[field] = order;
    var now = new Date();
    Booking.find({bookDate: {$gte: now }, libraryID: req.params.libraryID}, null, { sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
        if (err) {
            console.log('Bookings could not be loaded: ' + err);
        }

        res.send(collection);
    });
};