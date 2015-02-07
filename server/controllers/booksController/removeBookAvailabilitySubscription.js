'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription');

module.exports = function(req, res) {
    console.log('inside remove');
    console.log(req.params);

    BookSub.findOne({bookID: req.params.bookID, libraryID: req.params.libraryID, broadcasted: false}, function(err, subscription) {
        if(err) {
            res.status(503).send('Cannot connect to database');
        } else if(!subscription) {
            res.status(404).send('No subscriptions for this book');
        } else {
            if(subscription.users.indexOf(req.params.userID)>-1) {
                subscription.users.splice(subscription.users.indexOf(req.params.userID), 1);
                if(subscription.users.length===0) {
                    BookSub.findOneAndRemove({_id: subscription._id}, function(err) {
                        if(err) {
                            console.log('Failed to remove subscription ' + err);
                            res.status(503).send('Cannot connect to database');
                        }
                        res.end();
                    });
                } else {
                    BookSub.update({_id: subscription._id}, subscription, function(err) {
                        if(err) {
                            console.log('Failed to remove subscription: ' + err);
                            res.status(503).send('Cannot connect to database');
                        }
                        res.end();
                    });
                }
            } else {
                res.end();
            }
        }
    });
};