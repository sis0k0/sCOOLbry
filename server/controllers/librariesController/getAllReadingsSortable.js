'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {

    console.log('inside');
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
    console.log(req.params);
    Reading.find({libraryID: req.params.libraryID}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
        if (err) {
            console.log('Readings could not be loaded: ' + err);
        }
        console.log(collection);

        res.send(collection);
    });
};