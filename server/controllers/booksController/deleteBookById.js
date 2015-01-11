'use strict';

var Book   = require('mongoose').model('Book'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
    LibBook.remove({bookID: req.params.id}, function(err) {
        if(err) {
            console.log('LibBook could not be removed: ' + err);
            res.status('503').send('false');
        } else {
            Book.remove({_id: req.params.id}, function(err) {
                if(err) {
                    console.log('Book could not be removed: ' + err);
                    res.status('503').send('false');
                } else {
                    res.send('true');
                }
            });
        }
    });
};