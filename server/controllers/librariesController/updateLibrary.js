'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
		
	var updatedLibraryData = req.body;
	var updatedId = req.body._id;

	delete updatedLibraryData._id;
	delete updatedLibraryData.$promise;
	delete updatedLibraryData.$resolved;

	
	Library.update({_id: updatedId}, updatedLibraryData, function(err) {
		console.log(err);
		res.end();
	});
};