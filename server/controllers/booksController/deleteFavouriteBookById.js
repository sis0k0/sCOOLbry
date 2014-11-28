'use strict';

var FavBook = require('mongoose').model('FavBook');

module.exports = function(req, res) {
	console.log(req.params.bookID);
	FavBook.remove({bookID: req.params.bookID}, function(err) {
		if (err) {
				res.send('false');
		}else{
				res.send('true');
				
		}
	});
};