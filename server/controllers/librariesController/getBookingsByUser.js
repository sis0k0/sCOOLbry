'use strict';

var Booking = require('mongoose').model('Booking'),
    Book    = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var now = new Date();
    Booking.find({userID: req.params.userID, bookDate: {$gte: now } }).exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Bookings'));
        }

        var bookIDs = collection.map(function(booking){ return booking.bookID; });
        Book.find({_id: {$in: bookIDs} }, function (err, books) {

            if(err) {
                return next(new errors.DatabaseError(err, 'Books'));
            }
        	
            var result = [];
            var temp = {};

            
            collection.forEach(function(element, index) {
                temp = {'book': books[index], 'booking': element};
                
                result.push(temp);

            });
            res.send(result);
        });
        

        
    });
};