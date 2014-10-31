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
					if(error) {
						res.send(false);
					} else {
						if(returnedBook===null) {
							res.send(false);
						} else {
							res.send(returnedBook);
						}
					}
				});

			} else if(bookISBN.length===10) {
				bookISBN = '978' + bookISBN;

				Book.findOne({isbn: bookISBN}).exec(function(error, returnedBook) {
					if(error) {
						res.send(false);
					} else {
						if(returnedBook===null) {
							res.send(false);
						} else {
							res.send(returnedBook);
						}
					}
				});

			}

		}
	});
};