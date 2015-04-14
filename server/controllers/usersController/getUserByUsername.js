'use strict';

var User = require('mongoose').model('User');

module.exports = function(req, res) {
    User.findOne({username: req.params.username}).exec(function(err, user) {
        if (err || !user) {
            res.send(false);
        }else{
            res.send(true);
        }
    });
};