'use strict';

var Book    = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    console.log('inside');

    // Set sort params
    var order = req.params.order || 'asc',
        field = req.params.field || '_id',
        page = req.params.page || 1,
        perPage = req.params.perPage || 10,
        criteria = req.params.criteria || 'all',
        phrase = req.params.phrase || '';

    var condition = {};
    var sortObject = {};
    sortObject[field] = order;

    if(criteria==='all' && phrase!==' ' && phrase!=='') {
        condition  = { $or: [ {title: new RegExp(req.params.phrase, 'i')}, {author: new RegExp(req.params.phrase, 'i')}, {themes: new RegExp(req.params.phrase, 'i')} , {isbn: new RegExp(req.params.phrase, 'i')} ] };  
    }else if(phrase===' ' || phrase===''){
        condition = {};
    }else{
        var criteriaObj = {};
        criteriaObj[criteria] = new RegExp(req.params.phrase, 'i');
        condition  = { $or: [ criteriaObj ] };          
    }

    console.log(req.params.libraryID);
    if(typeof req.params.libraryID !== 'undefined') {
        console.log('lib');
        // Find library books and populate the book obj
        LibBook
        .find({libraryID: req.params.libraryID})
        .populate('bookID', condition, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage})
        .exec(function(err, collection) {

            if(err) {
                console.log('Books could not be loaded: ' + err);
            }

            res.send(collection);
        });
    } else {
    // Find book
        console.log('not');
        Book
        .find(condition, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage})
        .exec(function(err, collection) {

            if (err) {
                console.log('Books could not be loaded: ' + err);
            }

            res.send(collection);
        });
    }
};