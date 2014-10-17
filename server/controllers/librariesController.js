'use strict';

var Library = require('mongoose').model('Library');
var LibBook = require('mongoose').model('LibBook');
var LibUser = require('mongoose').model('LibUser');
var Reading = require('mongoose').model('Reading');

module.exports = {
	createLibrary: function(req, res) {
		var newLibraryData = req.body;
		
		Library.create(newLibraryData, function(err, library) {
			if (err) {
				console.log('Failed to add new library: ' + err);
				return;
			}
			
			res.send(library);
		});
   
	},
	addLibraryUser: function(req, res) {
		
		var newLibraryUser = new Object({});
		newLibraryUser.userID = req.body.userID;
		newLibraryUser.libraryID = req.body.libraryID;
		newLibraryUser.username = req.body.username;
		newLibraryUser.given = req.body.given;
		newLibraryUser.toReturn = req.body.toReturn;
		console.log(newLibraryUser);
		LibUser.create(newLibraryUser, function(err, user){
			if(err) {
				console.log('Failed to add the user to the library: '+err);
				return ;
			}
			
			res.send(user);
		});
		
	},
	getAllLibraries: function(req, res) {
		
		Library.find({}).exec(function(err, collection) {
			if (err) {
				console.log('Libraries could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},

	getAllLibrariesSortable: function(req, res) {

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
		Library.find({}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
			if (err) {
				console.log('Libraries could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},

	getLibraryCount: function(req, res) {

		Library.count({}).exec(function(err, collection) {
			if (err) {
				console.log('Libraries could not be loaded: ' + err);
			}

			res.send('' + collection);
		});
	},
	getLibraryUsersById: function(req, res) {

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
		LibUser.find({libraryID: req.params.id}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
			if (err) {
				console.log('Users could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},

	getLibraryUsersCount: function(req, res) {

		LibUser.count({}).exec(function(err, collection) {
			if (err) {
				console.log('Users could not be loaded: ' + err);
			}

			res.send('' + collection);
		});
	},

	getLibraryById: function(req, res) {

		Library.findOne({_id: req.params.id}).exec(function(err, library) {
			if (err) {
				console.log('Library could not be loaded: ' + err);
			}
			res.send(library);
		});
	},

	getLibraryBooksById: function(req, res) {
		LibBook.find({libraryID: req.params.id}).exec(function(err, books) {
			if (err) {
				console.log('LibBook could not be loaded: ' + err);
			}
			res.send(books);
		});
	},

	getLibBookById: function(req, res) {
		LibBook.findOne({_id: req.params.id}).exec(function(err, book) {
			if (err) {
				console.log('LibBook could not be loaded: ' + err);
			}
			res.send(book);
		});
	},

	updateLibrary: function(req, res) {
		
		if (req.user.roles.indexOf('admin') > -1 || req.user.roles.indexOf('librarian') > -1 ) {
			var updatedLibraryData = req.body;
		   
			var updatedId = req.body._id;
			delete updatedLibraryData._id;
			console.log(updatedLibraryData);
			
			Library.update({_id: updatedId}, updatedLibraryData, function(err) {
				console.log(err);
				res.end();
			});
		}
		else {
			res.send({reason: 'You do not have permissions!'});
		}
	},
	updateLibBook: function(req, res) {

		if (req.user.roles.indexOf('admin') > -1 || req.user.roles.indexOf('librarian') > -1 ) {
			var updatedLibraryData = req.body;
		   
			var updatedId = req.body._id;
			delete updatedLibraryData._id;
			
			LibBook.update({_id: updatedId}, updatedLibraryData, function(err) {
				console.log(err);
				res.end();
			});
		}
		else {
			res.send({reason: 'You do not have permissions!'});
		}
	},
	  
	deleteLibraryById: function(req, res) {
		
		Library.remove({_id: req.params.id}, function(err) {
			if (err) {
					res.send('false');
			}else{
					res.send('true');
					
			}
		});
	},
	
	deleteLibraryUser: function(req, res) {
		console.log(req.params);
		
		LibUser.remove({userID: req.params.id, libraryID: req.params.libraryID}, function(err) {
			if (err) {
				console.log(err);
					res.send('false');
			}else{
					res.send('true');
					
			}
		});
	},
	takeBook: function(req, res) {
		
		var newReader = req.body;
		Reading.create(newReader, function(err, reader) {
			if(err) {
				console.log('Failed to add the reading to the library: '+err);
				return ;
			}
			
			res.send(reader);
		});
	},
	returnBook: function(req, res) {
		console.log(req.body);
		var updatedReader = req.body;
		var updatedISBN = req.body.bookISBN;
		
		Reading.update({bookISBN: updatedISBN}, updatedReader, function(err) {
				console.log(err);
				res.end();
		});
	},
	getAllReadings: function(req, res) {
		Reading.find({}).exec(function(err, collection) {
			if (err) {
				console.log('Readings could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},
	getAllReadingsSortable: function(req, res) {

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
		Reading.find({}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
			if (err) {
				console.log('Readings could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},
	getAllNotReturnedReadings: function(req, res) {
		Reading.find({userID: req.params.userID, libraryID: req.params.libraryID, returnDate: undefined}).exec(function(err, collection) {
			if (err) {
				console.log('Readings could not be loaded: ' + err);
			}

			res.send(collection);
		});
	},
	isMember: function(req, res) {
		LibUser.findOne({userID: req.params.userID, libraryID: req.params.libraryID}).exec(function(err, member) {
			if (err) {
				console.log('Library Users could not be loaded: ' + err);
			}
			if(member===null) {
				res.send(false);
			}else{
				res.send(true);
			}
		});
	}	
};
