'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    console.log('inside');
    console.log(typeof req.params.isbn);
    Book.findOne({isbn: req.params.isbn}).exec(function(err, book) {
        console.log('err: ' + err);
        console.log(book);
        if (err || !book) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
};