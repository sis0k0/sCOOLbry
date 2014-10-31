'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	Book.findOne({isbn: req.params.isbn}).exec(function(err, book) {
		if (err) {
			res.send(false);
		} else {
			if(book===null) {
				res.send(false);
			} else {
				res.send(book);
			}
		}
	});
};