'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {
    Reading.find({userID: req.params.id}).exec(function(err, collection) {
    	console.log(collection);
    	
        if (err) {
            console.log('Readings could not be loaded: ' + err);
        }

        res.send(collection);
    });
};