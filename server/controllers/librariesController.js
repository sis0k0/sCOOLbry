'use strict';

var Library = require('mongoose').model('Library');

// !! FILES WEREN'T ADDED
//var LibBook = require('mongoose').model('LibBook');

module.exports = {
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
                console.log('Users could not be loaded: ' + err);
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

    getLibraryById: function(req, res) {

        Library.findOne({_id: req.params.id}).exec(function(err, library) {
            if (err) {
                console.log('Library could not be loaded: ' + err);
            }
            res.send(library);
        });
    },

    // !! FILES WEREN'T ADDED
    // getLibraryBooksById: function(req, res) {

    //     LibBook.find({libraryID: req.params.id}).exec(function(err, books) {
    //         if (err) {
    //             console.log('LibBook could not be loaded: ' + err);
    //         }
    //         res.send(books);
    //     });
    // },

    updateLibrary: function(req, res) {

		if (req.user.roles.indexOf('admin') > -1) {
            var updatedLibraryData = req.body;
           
            var updatedId = req.body._id;
            delete updatedLibraryData._id;
			
            Library.update({_id: updatedId}, updatedLibraryData, function(err) {
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
};