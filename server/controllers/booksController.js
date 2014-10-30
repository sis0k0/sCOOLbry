'use strict';

var Book    = require('mongoose').model('Book'),
	LibBook = require('mongoose').model('LibBook');

module.exports = {
	createBook: function(req, res) {
		var newBookData = req.body;
		var flag = false;
		//console.log(req.body);
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
	},
	getAllBooks: function(req, res) {
		Book.find({}).exec(function(err, collection) {
			if (err) {
				console.log('Books could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},
	getAllBooksSortable: function(req, res) {
		var order, field, page, perPage;
		
		if(req.params.order===undefined) {
			order = 'asc';
		}else{
			order = req.params.order;
		}
		
		if(req.params.field===undefined) {
			field = '_id';
		}else{
			field = req.params.field;
		}
		
		if(req.params.page===undefined) {
			page = 1;
		}else{
			page = req.params.page;
		}
		
		if(req.params.perPage===undefined) {
			perPage = 10;
		}else{
			perPage = req.params.perPage;
		}
		
		var sortObject = {};
		sortObject[field] = order;
		Book.find({}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage})
			.exec(function(err, collection) {

				if (err) {
					console.log('Books could not be loaded: ' + err);
				}

				res.send(collection);
			});
	},
	getBookCount: function(req, res) {
		Book.count({}).exec(function(err, collection) {
			if (err) {
				console.log('Libraries could not be loaded: ' + err);
			}

			res.send(''+collection);
		});
	},
	getBookById: function(req, res) {
		Book.findOne({_id: req.params.id}).exec(function(err, book) {
			if (err) {
				console.log('Book could not be loaded: ' + err);
			}
			res.send(book);
		});
	},
	updateBook: function(req, res) {
		if (req.user.roles.indexOf('admin') > -1) {
			var updatedBookData = req.body;
		   
			var updatedId = req.body._id;
			delete updatedBookData._id;
			
			Book.update({_id: updatedId}, updatedBookData, function(err) {
				console.log(err);
				res.end();
			});
		}
		else {
			res.send({reason: 'You do not have permissions!'});
		}
	},
	
	deleteBookById: function(req, res) {
		Book.remove({_id: req.params.id}, function(err) {
			if (err) {
					res.send('false');
			}else{
					res.send('true');
					
			}
		});
	},
	
	deleteBookFromLibraryById: function(req, res) {
		LibBook.remove({_id: req.params.id}, function(err) {
			if (err) {
					res.send('false');
			}else{
					res.send('true');
					
			}
		});
	},
};
