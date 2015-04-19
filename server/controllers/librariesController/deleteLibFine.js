'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
        
    LibFines.remove({_id: req.params.id}, function(err) {
        if (err) {
            console.log(err);
                res.send('false');
        }else{
                res.send('true');
                
        }
    });
};