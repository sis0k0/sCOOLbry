'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {

	Library.count({}).exec(function(err, collection) {
		if (err) {
			console.log('Libraries could not be loaded: ' + err);
		}

		res.send('' + collection);
	});
};