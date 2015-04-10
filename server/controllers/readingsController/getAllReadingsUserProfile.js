'use strict';

var Reading = require('mongoose').model('Reading');
var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    Reading.find({userID: req.params.userID}).exec(function(err, collection) {

        if (err) {
            res.status(400).send(err);
        }

        var bookIDs = collection.map(function(reading){ return reading.bookID; });
        Book.find({_id: {$in: bookIDs} }, function (err, books) {
        	
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