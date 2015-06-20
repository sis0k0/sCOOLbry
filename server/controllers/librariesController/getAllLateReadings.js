'use strict';

var Reading  = 	require('mongoose').model('Reading'),
    LibFines = 	require('mongoose').model('LibFines'),
    Library  = 	require('mongoose').model('Library'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

	var now = new Date();

    Reading.find({endDate: {$lte: now}, returnDate: undefined, fined: undefined}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Readings'));
        }

        collection.forEach(function(item){
        	Library.findOne({_id: item.libraryID}).exec(function(err, library) {
       			if (err || !library) {
                    console.log(err);
            	} else {
            		var newFine = new Object({}), now = new Date();
		    		newFine.userID = item.userID;
				    newFine.libraryID = item.libraryID;
		    		newFine.username = item.userName;
		    		if(library.lateFine===undefined){
		    			newFine.amount = 10;
		    		}else{
		    			newFine.amount = library.lateFine;
				    }
				    newFine.reason = 'You have not returned your book in time';
				    newFine.added = now;
		   			newFine.paid = undefined;

		   			LibFines.create(newFine, function(){
			     		Reading.update({_id: item._id}, {fined: now});
		            });

       		 	}
    		});

        });

        res.send(collection);
    });
};