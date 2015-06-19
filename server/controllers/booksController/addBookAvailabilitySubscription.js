'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription'),
    errors  = require('../../utilities/httpErrors');


module.exports = function(req, res, next) {
    console.log(req.body);

    BookSub.findOne({bookID: req.body.bookID, libraryID: req.body.libraryID, broadcasted: false}, function(err, subscription) {

        if(err) {
            return next(new errors.DatabaseError(err, 'Book Subscription'));

        } else if(!subscription) {
            var usersArray = [req.body.userID];
            BookSub.create({users: usersArray, bookID: req.body.bookID, libraryID: req.body.libraryID}, function(err) {
                if (err) {
                    return next(new errors.DatabaseError(err, 'Book Subscription'));
                }
                res.end();
            });

        } else {
            console.log(subscription);
            if(subscription.users.indexOf(req.body.userID)<0) {
                subscription.users.push(req.body.userID);
                BookSub.update({_id: subscription._id}, subscription, function(err) {
                    if(err) {
                        return next(new errors.DatabaseError(err, 'Book Subscription'));
                    }
                    res.end();
                });
            } else {
                res.end();
            }
        }
    });
};