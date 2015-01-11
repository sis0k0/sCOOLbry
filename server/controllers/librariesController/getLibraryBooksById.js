'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
    LibBook.find({libraryID: req.params.id}).exec(function(err, books) {
        if (err) {
            console.log('LibBook could not be loaded: ' + err);
        }
        
        res.send(books);
    });
};