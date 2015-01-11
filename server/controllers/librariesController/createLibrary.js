'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
    var newLibraryData = req.body;
    
    Library.create(newLibraryData, function(err, library) {
        if (err) {
            console.log('Failed to add new library: ' + err);
            return;
        }
        
        res.send(library);
    });
};