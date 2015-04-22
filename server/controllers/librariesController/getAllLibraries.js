'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
    
    // Get all certified libraries and return them
    Library
    .find({certified: true})
    .exec(function(err, collection) {
        if (err) {
            console.log('Libraries could not be loaded: ' + err);
        }

        res.send(collection);
    });
};