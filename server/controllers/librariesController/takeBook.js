'use strict';

var	LibBook = require('mongoose').model('LibBook'),
	Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {
		
	var newReader = req.body;
	console.log(newReader);
	Reading.create(newReader, function(err, reader) {
		if(err) {
			console.log('Failed to add the reading to the library: '+err);
			return ;
		}
		
		LibBook.update({libraryID: newReader.libraryID, bookID: newReader.bookID}, {$inc: {available: -1, given: +1}}, function(err) {
			console.log(err);
		});

		//TODO: delete bookings
		
		res.send(reader);
	});
};