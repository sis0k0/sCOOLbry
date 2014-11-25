'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	var book = req.body,
		data = new Object({});

	data.bookID = book._id;
	data.bookISBN = book.isbn;
	data.libraryID = book.libraryID;
	data.bookName = book.title;
	data.total = book.total;
	data.available = book.available;

	LibBook.create(data, function(err, book){
		if(err){
			console.log('Failed to assign new book to library: ' +  err);
			return;
		}
		console.log(book);
		res.send(book);
	});
};