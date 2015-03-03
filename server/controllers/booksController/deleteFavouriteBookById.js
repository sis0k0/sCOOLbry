'use strict';

var FavBook = require('mongoose').model('FavBook');

module.exports = function(req, res) {
    console.log(req.params.bookID);
    FavBook.remove({userID: req.params.userID, bookID: req.params.bookID, libraryID: req.params.libraryID}, function(err) {
        if (err) {
            res.send('false');
        }else{
            res.send('true');
                
        }
    });
};