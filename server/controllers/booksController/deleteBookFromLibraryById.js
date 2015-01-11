'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
    LibBook.remove({_id: req.params.id}, function(err) {
        if (err) {
            res.send('false');
        }else{
            res.send('true');    
        }
    });
};