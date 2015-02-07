'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription');

module.exports = function(req, res) {

    BookSub.findOne({bookID: req.params.bookID, libraryID: req.params.libraryID, broadcasted: false}, function(err, subscription) {
        if(err) {
            console.log('Cannot connect ot database: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!subscription) {
            res.send(false);
        } else {
            if(typeof req.params.userID !== 'undefined') {
                if(subscription.users.indexOf(req.params.userID)>-1) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            } else {
                res.send(subscription);
            }
        }
    });
};