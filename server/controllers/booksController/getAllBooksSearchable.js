'use strict';

var    Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    
    console.log(req.params.limit);
    
    if(req.params.limit===undefined) {
        req.params.limit = 4;
    }

    Book.find({ $or: [ {title: new RegExp(req.params.phrase, 'i')}, {author: new RegExp(req.params.phrase, 'i')}, {description: new RegExp(req.params.phrase, 'i')} , {isbn: new RegExp(req.params.phrase, 'i')} ] }, null, {limit: req.params.limit}).exec(function(err, collection) {
        if (err) {
            console.log('Books could not be loaded: ' + err);
        }

        res.send(collection);
    });
};