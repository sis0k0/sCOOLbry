'use strict';

var FavBook = require('mongoose').model('FavBook');

module.exports = function(req, res) {
    FavBook.findOne({userID: req.params.userID, bookID: req.params.bookID}).exec(function(err, favourite) {
        if (err) {
            console.log('Favourite Books could not be loaded: ' + err);
        }
        if(favourite===null) {
            res.send(false);
        }else{
            res.send(true);
        }
    });
};