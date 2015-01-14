'use strict';

var Reading = require('mongoose').model('Reading'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    console.log(req.body);
    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID}, req.body, function(err) {
            
        if(err) {
            console.log(err);
        }
        
        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                console.log(err);
            }
            res.end();

        });

    });
};