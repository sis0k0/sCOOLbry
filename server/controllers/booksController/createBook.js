'use strict';

var Book    = require('mongoose').model('Book'),
	LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
	var newBookData = req.body;
	var flag = false;

	if(req.body.libraryID!==undefined) {
		flag = true;
	}
	
	if(flag){
		var libraryID = req.body.libraryID;
		var total = req.body.total;
		var given = req.body.given;
		var available = req.body.available;
		delete req.body.libraryID;
		delete req.body.total;
		delete req.body.given;
		delete req.body.available;
	}
	
	Book.create(newBookData, function(err, book) {
		if (err) {
			console.log('Failed to add new book: ' + err);
			return;
		}
		
		if(flag){
			var newAssignData = new Object({});
			newAssignData.bookID = book._id;
			newAssignData.libraryID = libraryID;
			newAssignData.bookName = book.title;
			newAssignData.total = total;
			newAssignData.available = available;
			newAssignData.given = given;
			console.log(newAssignData);
			LibBook.create(newAssignData, function(err2){
				if(err2){
					console.log('Failed to assign new book to library: ' +  err);
					return ;
				}
			});
		}
		
		res.send(book);
	});
};