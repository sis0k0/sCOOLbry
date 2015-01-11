'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
    Library.findOne({_id: req.params.libraryID}).exec(function(err, library) {
        if (err) {
            console.log('Library could not be loaded: ' + err);
        }

        library.librarians.push(req.params.userID);
        

        var updatedLibraryData = new Object({});
        updatedLibraryData = library.toObject();
        console.log(updatedLibraryData);
        delete updatedLibraryData._id;
        delete updatedLibraryData.$promise;
        delete updatedLibraryData.$resolved;

        Library.update({_id: req.params.libraryID}, updatedLibraryData, function(err) {
            console.log(err);
            
        });
        
        res.send(library);
    });
};