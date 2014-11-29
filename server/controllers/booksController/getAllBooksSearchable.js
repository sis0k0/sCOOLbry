'use strict';

var	Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	Book.find({ $or: [ {title: new RegExp(req.params.phrase, 'i')}, {author: new RegExp(req.params.phrase, 'i')}, {description: new RegExp(req.params.phrase, 'i')} ] }, null, {limit: 4}).exec(function(err, collection) {
		if (err) {
			console.log('Books could not be loaded: ' + err);
		}

		res.send(collection);
	});
};