'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {
	Reading.find({}).exec(function(err, collection) {
		if (err) {
			console.log('Readings could not be loaded: ' + err);
		}

		res.send(collection);
	});
};