'use strict';

var Book = require('mongoose').model('Book');

// !! FILES WEREN'T ADDED
//var LibBook = require('mongoose').model('LibBook');

module.exports = {
    createBook: function(req, res) {
        var newBookData = req.body;
		
		Book.create(newBookData, function(err, book) {
			if (err) {
				console.log('Failed to add new book: ' + err);
				return;
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
};
