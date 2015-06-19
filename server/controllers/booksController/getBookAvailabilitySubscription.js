'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    BookSub.findOne({bookID: req.params.bookID, libraryID: req.params.libraryID, broadcasted: false}, function(err, subscription) {

        if(err || !subscription) {
            return next(new errors.DatabaseError(err, 'Book Subscription'));

        } else {

            // Send boolean if an userID argument is passed
            if(typeof req.params.userID !== 'undefined') {
                if(subscription.users.indexOf(req.params.userID)>-1) {
                    res.send(true);
                } else {
                    res.send(false);
                }

            // Send the subscription if no userID argument is passed
            } else {
                res.send(subscription);
            }
        }
    });
};