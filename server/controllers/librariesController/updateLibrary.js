'use strict';

var Library = require('mongoose').model('Library');

module.exports = function(req, res) {
        
    var updatedLibraryData = req.body;
    var updatedId = req.body._id;

    delete updatedLibraryData._id;
    delete updatedLibraryData.$promise;
    delete updatedLibraryData.$resolved;

    
    Library.update({_id: updatedId}, updatedLibraryData, {runValidators: true}, function(err) {
        if(err) {
            console.log(err);
            res.status(400).send({reason: err});
        } else {
            res.status(200).end();
        }
    });
};