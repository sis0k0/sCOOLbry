'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {
    LibUser.findOne({userID: req.params.userID, libraryID: req.params.libraryID}).exec(function(err, member) {
        if (err) {
            console.log('Library Users could not be loaded: ' + err);
        }
        if(member===null) {
            res.send(false);
        }else{
            res.send(true);
        }
    });
};