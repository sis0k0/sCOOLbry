'use strict';

var    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    if (req.user.roles.indexOf('admin') > -1 || req.user.roles.indexOf('librarian') > -1 ) {
        var updatedLibraryData = req.body;

        var updatedId = req.body._id;
        delete updatedLibraryData._id;
        delete updatedLibraryData.$promise;
        delete updatedLibraryData.$resolved;
        
        LibBook.update({_id: updatedId}, updatedLibraryData, function(err) {
            console.log(err);
            res.end();
        });
    }
    else {
        res.send({reason: 'You do not have permissions!'});
    }
};