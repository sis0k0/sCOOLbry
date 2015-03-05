'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    if (req.user.roles.indexOf('admin') > -1) {
        var updatedBookData = req.body;
        var updatedId = req.body._id;
        delete updatedBookData._id;
        delete updatedBookData.$resolved;
        delete updatedBookData.$promise;
        
        Book.update({_id: updatedId}, updatedBookData, {runValidators: true}, function(err) {
            if(err) {
                console.log(err);
                res.status(400).send({reason: err});
            } else {
                res.status(200).end();
            }
        });
    }
    else {
        res.send({reason: 'You do not have permissions!'});
    }
};