'use strict';

var FavBook = require('mongoose').model('FavBook');

module.exports = function(req, res) {
    FavBook
    .find({userID: req.params.userID})
    .populate({
        path: 'bookID',
        select: '-__v'
    })
    .exec(function(err, collection) {
        if (err) {
            console.log('Books could not be loaded: ' + err);
        }

        res.send(collection);
    });
};