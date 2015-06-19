'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Library.findOne({_id: req.params.libraryID}).exec(function(err, library) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Library'));
        }

        library.librarians.push(req.params.userID);

        var updatedLibraryData = new Object({});
        updatedLibraryData = library.toObject();
        console.log(updatedLibraryData);
        delete updatedLibraryData._id;
        delete updatedLibraryData.$promise;
        delete updatedLibraryData.$resolved;

        Library.update({_id: req.params.libraryID}, updatedLibraryData, function(err) {
            return next(new errors.DatabaseError(err, 'Library')); 
            
        });
        
        res.send(library);
    });
};