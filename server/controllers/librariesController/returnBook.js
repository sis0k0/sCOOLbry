'use strict';

var Reading = require('mongoose').model('Reading'),
	LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

	var updatedReader = new Object({});
	var updatedISBN = req.body.bookInfo.bookISBN;

	
	updatedReader.userID = req.body.userID;
	updatedReader.libraryID = req.body.bookInfo.libraryID;
	updatedReader.librarian1ID = req.body.bookInfo.librarian1ID;
	updatedReader.librarian2ID = req.body.librarian2ID;
	updatedReader.bookID = req.body.bookInfo.bookID;
	updatedReader.bookName = req.body.bookInfo.bookName;
	updatedReader.bookISBN = req.body.bookInfo.bookISBN;
	updatedReader.startDate = req.body.bookInfo.startDate;
	updatedReader.endDate = req.body.bookInfo.endDate;
	updatedReader.returnDate = req.body.returnDate;
	updatedReader.comment = req.body.bookInfo.comment;
	
	Reading.update({bookISBN: updatedISBN, userID: req.body.userID, libraryID: req.body.bookInfo.libraryID}, updatedReader, function(err) {
			
		if(err) {
			console.log(err);
		}
		
		LibBook.update({libraryID: req.body.bookInfo.libraryID, bookID: req.body.bookInfo.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
			if(err) {
				console.log(err);
			}
		});

		res.end();
	});
};