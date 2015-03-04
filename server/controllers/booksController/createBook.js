'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    var newBookData = req.body;
    
    Book.create(newBookData, function(err, book) {
        if (err) {
            console.log('Failed to add new book: ' + err);
            res.status(400).send({reason: err});
        }
        res.send(book);
    });
};