'use strict';

var Book    = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    // Set sort params
    var order = req.params.order || 'asc',
        field = req.params.field || '_id',
        page = req.params.page || 1,
        perPage = req.params.perPage || 10,
        criteria = req.params.criteria || 'all',
        phrase = req.params.phrase || ' ';

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

    if(req.params.libraryID !== 'all') {
    // Get lib books and populate the matched books        
        LibBook
        .find({libraryID: req.params.libraryID})
        .populate({
            path: 'bookID', 
            match: condition, 
            options: {sort: sortObject, limit: perPage, skip: (page-1)*perPage}
        })
        .exec(function(err, books) {

            if(err) {
                console.log('Books could not be loaded: ' + err);
            }

            var matchedBooks = [];
            for(var index in books) {
                if(books[index].bookID !== null) {
                    matchedBooks.push(books[index]);
                }
            }

            res.send(matchedBooks);
        });
    } else {
    // Find book
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