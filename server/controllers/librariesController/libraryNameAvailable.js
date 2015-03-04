'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
    Library.findOne({name: req.params.name}).exec(function(err, library) {
        if (err) {
            res.send(false);
        }else{
            if(library===null){
                res.send(false);
            }else{
                res.send(true);
            }
            
        }
    });
};