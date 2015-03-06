'use strict';

var LibBook = require('mongoose').model('LibBook'),
    Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {

    var conditions = ({});
    conditions.libraryID = req.params.id;
    console.log(req.params);

    if(req.params.available === 'true') {
        conditions.available = ({$gte: 1});
    }

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
    
    LibBook.find(conditions, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, books) {
        if (err) {
            console.log('LibBook could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else {
            res.send(books);
        }
    });
};