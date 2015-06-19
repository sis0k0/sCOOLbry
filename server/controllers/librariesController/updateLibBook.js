'use strict';

var LibBook = require('mongoose').model('LibBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var updatedLibraryData = req.body;

    var updatedId = req.body._id;
    delete updatedLibraryData._id;
    delete updatedLibraryData.$promise;
    delete updatedLibraryData.$resolved;
    
    LibBook.update({_id: updatedId}, updatedLibraryData, {runValidators: true}, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Library Book'));
        }
        res.end();
    });
};