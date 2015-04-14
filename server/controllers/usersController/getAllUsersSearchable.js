'use strict';

var User = require('mongoose').model('User');

module.exports = function(req, res) {

    User
    .find(
            { 
                $or: [ 
                    {username: new RegExp(req.params.phrase, 'i')},
                    {firstName: new RegExp(req.params.phrase, 'i')},
                    {lastName: new RegExp(req.params.phrase, 'i')},
                    {email: new RegExp(req.params.phrase, 'i')} 
                ] 
            }
        )
    .exec(function(err, collection) {
        if (err) {
            console.log('Users could not be loaded: ' + err);
        }
        res.send(collection);
    });
};