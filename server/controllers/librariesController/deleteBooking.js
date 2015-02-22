'use strict';

var Booking      = require('mongoose').model('Booking'),
    BookSub      = require('mongoose').model('BookAvailabilitySubscription'),
    Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {
    Booking.findOneAndRemove({_id: req.params.id}, function(err, booking) {
        if (err) {
            res.status(503).send('Cannot connect to database');
        }else{
            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            socketio.sockets.emit(booking.bookID, 'increase'); // emit an event for all users viewing the book

            BookSub.findOne({bookID: booking.bookID, libraryID: booking.libraryID}, function(err, subscription) {
                if(!err && !!subscription && subscription.broadcasted===false) {
                    var added = 0;

                    for(var i=0; i<subscription.users.length; i++) {
                        Notification.findOne({
                            message: '<strong class="text-info">' + booking.bookName + '<\/strong> is available at <strong class="text-info">' + booking.libraryName + '<\/strong> now!',
                            userID: subscription.users[i],
                            seen: false
                        }, function(err, existingNotification) {
                            console.log(err);
                            console.log(existingNotification);
                            if(!err && !existingNotification) {

                                var notification = {
                                    href: '/book/' + booking.bookID + '/' + booking.libraryID,
                                    message: '<strong class="text-info">' + booking.bookName + '<\/strong> is available at <strong class="text-info">' + booking.libraryName + '<\/strong> now!',
                                    userID: subscription.users[added]
                                };

                                Notification.create(notification, function(err, newNotification) {
                                    added++;
                                    if(!err) {
                                        socketio.sockets.emit(newNotification.userID + ' notification added', newNotification);
                                    }
                                });
                            } else {
                                added++;
                            }
                        });
                    }

                    subscription.broadcasted = true;
                    BookSub.update({_id: subscription._id}, subscription);

                }
            });


            res.send('true');
        }
    });
};