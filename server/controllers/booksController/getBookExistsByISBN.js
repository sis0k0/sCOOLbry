'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    console.log('inside');
    Book.findOne({isbn: req.params.isbn}).exec(function(err, book) {
        if (err || !book) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
};