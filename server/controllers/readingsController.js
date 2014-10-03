'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = {
	
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
	getAllReadingsUser: function(req, res) {
		Reading.find({userID: req.params.id}).exec(function(err, collection) {
            if (err) {
                console.log('Readings could not be loaded: ' + err);
            }

            res.send(collection);
        });
	},
	getAllReadingsInLibraryForUser: function(req, res) {
		Reading.find({userID: req.params.userID, libraryID: req.params.libraryID}).exec(function(err, collection) {
            if (err) {
                console.log('Readings could not be loaded: ' + err);
            }

            res.send(collection);
        });
	},
	getAllReadingsUserSortable: function(req, res) {

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
        Reading.find({userID: req.params.id}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
            if (err) {
                console.log('Readings could not be loaded: ' + err);
            }

            res.send(collection);
        });
    }
	    
};