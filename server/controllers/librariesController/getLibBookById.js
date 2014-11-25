'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	LibBook.findOne({_id: req.params.id}).exec(function(err, book) {
		if (err) {
			console.log('LibBook could not be loaded: ' + err);
		}
		res.send(book);
	});
};