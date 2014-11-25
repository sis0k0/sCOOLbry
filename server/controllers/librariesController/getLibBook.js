'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	LibBook.findOne({libraryID: req.params.libraryID, bookID: req.params.bookID}).exec(function(err, book) {
		if (err) {
			console.log('LibBook could not be loaded: ' + err);
		}
		res.send(book);
	});
};