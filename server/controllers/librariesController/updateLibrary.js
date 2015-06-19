'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    var updatedLibraryData = req.body;
    var updatedId = req.body._id;

    delete updatedLibraryData._id;
    delete updatedLibraryData.$promise;
    delete updatedLibraryData.$resolved;

    
    Library.update({_id: updatedId}, updatedLibraryData, {runValidators: true}, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Library'));
        }
        res.status(200).end();
    });
};