'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {

	LibUser.count({libraryID: req.params.libraryID}).exec(function(err, collection) {
		if (err) {
			console.log('Users could not be loaded: ' + err);
		}

		res.send('' + collection);
	});
};