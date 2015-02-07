'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription');

module.exports = function(req, res) {
    console.log(req.body);

    BookSub.findOne({bookID: req.body.bookID, libraryID: req.body.libraryID, broadcasted: false}, function(err, subscription) {
        if(err) {
            res.status(503).send('Cannot connect to database');
        } else if(!subscription) {
            var usersArray = [req.body.userID];
            BookSub.create({users: usersArray, bookID: req.body.bookID, libraryID: req.body.libraryID}, function(err) {
                if (err) {
                    console.log('Failed to add new subscription: ' + err);
                    res.status(503).send('Cannot connect to database');
                }
                res.end();
            });
        } else {
            subscription.users.push(req.body.userID);
            BookSub.update({_id: subscription._id}, subscription, function(err) {
                if(err) {
                    console.log('Failed to add new subscription: ' + err);
                    res.status(503).send('Cannot connect to database');
                }
                res.end();
            });
        }
    });
};