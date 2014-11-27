'use strict';

var FavBook = require('mongoose').model('FavBook');

module.exports = function(req, res) {
	var newFavBookData = req.body;
	
	FavBook.create(newFavBookData, function(err, book) {
		if (err) {
			console.log('Failed to add new favourite book: ' + err);
			return;
		}
		
		res.send(book);
	});
};