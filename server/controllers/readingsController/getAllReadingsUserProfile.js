'use strict';

var Reading = require('mongoose').model('Reading'),
    Book    = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    Reading.find({userID: req.params.userID}).exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Readings'));
        }

        var bookIDs = collection.map(function(reading){ return reading.bookID; });
        Book.find({_id: {$in: bookIDs} }, function (err, books) {

            if(err) {
                return next(new errors.DatabaseError(err, 'Books'));
            }
        	
            var result = [];
            var temp = {};

            
            collection.forEach(function(element, index) {
                temp = {'book': books[index], 'reading': element};
                
                result.push(temp);

            });
            res.send(result);
        });
        

        
    });
};