'use strict';

var Book        = require('mongoose').model('Book'),
    BookService = require('../../services/BookService');


module.exports = function(req, res) {
    var newBookData = req.body;
    for(var prop in newBookData) {
        if(typeof newBookData[prop] === 'string') {
            newBookData[prop] = newBookData[prop].trim();
        }
        if(!newBookData[prop]) {
            delete newBookData[prop];
        }
    }

    Book.create(newBookData, function(err, book) {
        if (err) {
            console.log(err);
            res.status(400).send({reason: err});
        }
        res.send(book);

        if(book.ebookUrl) {
            BookService.indexEbook(book._id, book.ebookUrl, function(err) {
                if(err) {
                    console.log(err);
                }
            });
        }

    });
};