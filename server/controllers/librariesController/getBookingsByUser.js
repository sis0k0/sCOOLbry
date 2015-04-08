'use strict';

var Booking = require('mongoose').model('Booking');
var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    var now = new Date();
    Booking.find({userID: req.params.userID, bookDate: {$gte: now } }).exec(function(err, collection) {

        if (err) {
            res.status(400).send(err);
        }

        var bookIDs = collection.map(function(booking){ return booking.bookID; });
        Book.find({_id: {$in: bookIDs} }, function (err, books) {
        	
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