'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {
	Reading.find({libraryID: req.params.libraryID}).distinct('userID').exec(function(err, collection) {
		if (err) {
			console.log('Readings could not be loaded: ' + err);
		}
		var collection2 = [];

		collection.forEach(function(value){
			collection2.push({userID: value});
		});
		res.send(collection2);
	});
};