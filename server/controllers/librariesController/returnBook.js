'use strict';

var Reading      = require('mongoose').model('Reading'),
    LibBook      = require('mongoose').model('LibBook'),
    BookSub      = require('mongoose').model('BookAvailabilitySubscription'),
    Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {

    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    console.log('body: ');
    console.log(req.body);
    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID, returnDate: undefined}, req.body, function(err) {
            
        if(err) {
            console.log(err);
        }
        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                console.log('Cannot connect to database: ' + err);
                res.status(503).send('Cannot connect to database');
            }
            socketio.sockets.emit(req.body.bookID, 'increase'); // emit an event for all users viewing the book

            BookSub.findOne({bookID: req.body.bookID, libraryID: req.body.libraryID}, function(err, subscription) {
                console.log(err);
                console.log(subscription);
                if(!err && !!subscription && subscription.broadcasted===false) {
                    var added = 0;

                    for(var i=0; i<subscription.users.length; i++) {
                        Notification.findOne({
                            message: req.body.bookName + ' is available now!',
                            userID: subscription.users[i],
                            seen: false
                        }, function(err, existingNotification) {
                            if(!err && !existingNotification) {

                                var notification = {
                                    href: '/book/' + req.body.bookID + '/' + req.body.libraryID,
                                    message: '<strong class="text-info">' + req.body.bookName + '<\/strong> is available at <strong class="text-info">' + req.body.libraryName + '<\/strong> now!',
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

            res.end();
        });

    });
};