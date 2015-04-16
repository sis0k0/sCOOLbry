'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {
    LibUser
    .findOne({
        userID: req.params.userID,
        libraryID: req.params.libraryID
    })
    .exec(function(err, member) {
        if (err || !member) {
            res.send(false);
        } else {
            res.send(member);
        }
    });
};