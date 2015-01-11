'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {

    var bookISBN = req.params.isbn;


    Book.findOne({isbn: bookISBN}).exec(function(err, book) {
        if(book!==null && !err) {
            res.send(book);
        } else {

            if(bookISBN.length===13) {
                bookISBN = bookISBN.substring(3,13);

                Book.findOne({isbn: bookISBN}).exec(function(error, returnedBook) {
                    if(returnedBook!==null && !error) {
                        console.log('database');
                        res.send(returnedBook);
                    } else {
                        res.send(false);
                    }
                });

            } else if(bookISBN.length===10) {
                bookISBN = '978' + bookISBN;

                Book.findOne({isbn: bookISBN}).exec(function(error, returnedBook) {
                    if(returnedBook!==null && !error) {
                        console.log('database');
                        res.send(returnedBook);
                    } else {
                        res.send(false);
                    }
                });

            } else {
                bookISBN = bookISBN.replace(/-/gi, '');
                Book.findOne({isbn: bookISBN}).exec(function(error, returnedBook) {
                    if(returnedBook!==null && !error) {
                        console.log('database');
                        res.send(returnedBook);
                    } else {
                        res.send(false);
                    }
                });
            }
        }
    });
};