'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    var order, field, page, perPage, criteria, phrase, criteriaObj, condition;
    
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

    if(req.params.criteria===undefined) {
        criteria = 'all';
    }else{
        criteria = req.params.criteria; //title, author, themes, isbn
    }

    if(req.params.phrase===undefined) {
        phrase = '';
    }else{
        phrase = req.params.phrase;
    }
    
    var sortObject = {};
    sortObject[field] = order;

    if(criteria==='all' && phrase!==' ' && phrase!=='') {
        condition  = { $or: [ {title: new RegExp(req.params.phrase, 'i')}, {author: new RegExp(req.params.phrase, 'i')}, {themes: new RegExp(req.params.phrase, 'i')} , {isbn: new RegExp(req.params.phrase, 'i')} ] };  
    }else if(phrase===' ' || phrase===''){
        condition = {};
    }else{
        criteriaObj = {};
        criteriaObj[criteria] = new RegExp(req.params.phrase, 'i');
        condition  = { $or: [ criteriaObj ] };          
    }
    console.log(req.params);

    Book.count(condition).exec(function(err, collection) {

            if (err) {
                console.log('Books could not be loaded: ' + err);
            }

            res.send(''+collection);
    });
};