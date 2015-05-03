'use strict';

var Reading 	= 	require('mongoose').model('Reading');
var LibFines	= 	require('mongoose').model('LibFines');
var Library 	= 	require('mongoose').model('Library');

module.exports = function(req, res) {

	var now = new Date();

    Reading.find({endDate: {$lte: now}, returnDate: undefined, fined: undefined}).exec(function(err, collection) {
        if (err) {
            console.log('Readings could not be loaded: ' + err);
        }

        collection.forEach(function(item){
        	Library.findOne({_id: item.libraryID}).exec(function(err, library) {
       			if (err) {
            		console.log('Library could not be loaded: ' + err);
            	} else if(!library) {
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

		   			LibFines.create(newFine, function(err){
		       			if(err) {
		            		console.log('Failed to add the fine: '+err);
			     		}

			     		Reading.update({_id: item._id}, {fined: now}, function(err){
			     			if(err) {
			     				console.log(err);
			     			}
			     		});
		            });

       		 	}
    		});

			

		   // LibFines.create(newFine, function(err, fine){
		       // if(err) {
		   //         console.log('Failed to add the fine: '+err);
		     //       res.send({reason: err});
		       // } else {

		  //          var socketio = req.app.get('socketio'); // take out socket instance from the app container
		            // Notify the user
		    //        var result = Notification.addFine(socketio, fine.amount, fine.userID);
		      //      console.log(result);
		        //    if(result) { // If error is returned
		          //      res.status(400).send({reason: result});
		           //     return;
		            //} else { // If no error occured
		              //  res.send(fine); // Return the fine
		            //}
		    //    }
		   // });

        });

        res.send(collection);
    });
};