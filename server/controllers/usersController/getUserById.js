'use strict';

var User = require('mongoose').model('User');

module.exports = function(req, res) {
    User.findOne({_id: req.params.id}).exec(function(err, user) {
        if (err) {
            res.status(503).send('Cannot connect to database');
        } else if(!user){
            res.status(404).send('User not found');
        } else {
            res.send(user);
        }
    });
};