'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var newLibraryData = req.body;
    
    
    Library.create(newLibraryData, function(err, library) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Library'));
        }
        
        res.send(library);
    });
};