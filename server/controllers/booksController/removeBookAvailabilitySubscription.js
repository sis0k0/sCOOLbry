'use strict';

var BookSub = require('mongoose').model('BookAvailabilitySubscription'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    BookSub.findOne({bookID: req.params.bookID, libraryID: req.params.libraryID, broadcasted: false}, function(err, subscription) {
        if(err || !subscription) {
            return next(new errors.DatabaseError(err, 'Book Subscription'));

        } else {
            if(subscription.users.indexOf(req.params.userID)>-1) {
                subscription.users.splice(subscription.users.indexOf(req.params.userID), 1);
                if(subscription.users.length===0) {
                    BookSub.findOneAndRemove({_id: subscription._id}, function(err) {
                        if(err) {
                            return next(new errors.DatabaseError(err, 'Book Subscription'));
                        }
                        res.end();
                    });
                } else {
                    BookSub.update({_id: subscription._id}, subscription, function(err) {
                        if(err) {
                            return next(new errors.DatabaseError(err, 'Book Subscription'));
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