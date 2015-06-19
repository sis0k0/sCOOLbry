'use strict';

var User = require('mongoose').model('User');

module.exports = function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');

    User.findOne({id: req.params.userID}).exec(function(err, user) {
        if(err) {
            console.log('User could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!user) {
            res.status(404).send('User not found');
        } else if(typeof user.ownLibraryID === 'undefined' || user.ownLibraryID === '') {
            res.status(400).send('User not library owner');
        } else {
            res.send(user.ownLibraryID);
        }
    });
};