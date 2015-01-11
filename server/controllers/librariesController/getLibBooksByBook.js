'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	LibBook.find({bookID: req.params.id}).exec(function(err, books) {
		if (err) {
			console.log('LibBook could not be loaded: ' + err);
			res.status(503).send('Cannot connect to database');
		}
		res.send(books);
	});
};