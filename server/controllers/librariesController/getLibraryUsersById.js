'use strict';

var LibUser = require('mongoose').model('LibUser');

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