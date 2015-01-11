'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
        
    Library.remove({_id: req.params.id}, function(err) {
        if (err) {
                res.send('false');
        }else{
                res.send('true');
                
        }
    });
};