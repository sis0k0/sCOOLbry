'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {

    if (req.user.roles.indexOf('admin') > -1 || req.user.roles.indexOf('librarian') > -1 ) {
        var now = new Date();

        var paidObject = {
            paid: now
        };

        var updatedId = req.params.id;
        
        LibFines.update({_id: updatedId}, paidObject, {runValidators: true}, function(err) {
            console.log(err);
            res.end();
        });
    }
    else {
        res.send({reason: 'You do not have permissions!'});
    }
};