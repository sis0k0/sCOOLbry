'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	Book.find({}).exec(function(err, collection) {
		if (err) {
			console.log('Books could not be loaded: ' + err);
		}

		res.send(collection);
	});
};