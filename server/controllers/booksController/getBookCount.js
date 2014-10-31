'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	Book.count({}).exec(function(err, collection) {
		if (err) {
			console.log('Books could not be loaded: ' + err);
		}

		res.send(''+collection);
	});
};