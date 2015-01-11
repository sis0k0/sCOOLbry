'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    Book.findOne({_id: req.params.id}).exec(function(err, book) {
        if (err) {
            console.log('Book could not be loaded: ' + err);
        }
        res.send(book);
    });
};