'use strict';

var Reading      = require('mongoose').model('Reading'),
    LibBook      = require('mongoose').model('LibBook'),
    BookSub      = require('mongoose').model('BookAvailabilitySubscription'),
    Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {

    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    console.log('body: ');
    console.log(req.body);
    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID, returnDate: undefined}, req.body, function(err, reading) {
            
        if(err) {
            console.log(err);
        }
        console.log('reading: ');
        console.log(reading);
        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                console.log('Cannot connect to database: ' + err);
                res.status(503).send('Cannot connect to database');
            }
            socketio.sockets.emit(req.body.bookID, 'increase'); // emit an event for all users viewing the book

            BookSub.findOne({bookID: req.body.bookID, libraryID: req.body.libraryID, broadcasted: false}, function(err, subscription) {
                if(!!subscription) {
                    console.log('sub: ');
                    console.log(subscription);

                    var added = 0;

                    for(var i=0; i<subscription.users.length; i++) {
                        console.log('user: ');
                        console.log(subscription.users[i]);

                        Notification.findOne({
                            message: req.body.bookName + ' is available now!',
                            userID: subscription.users[i],
                            seen: false
                        }, function(err, foundNotification) {
                            if(!err && !foundNotification) {
                                Notification.create({
                                    message: req.body.bookName + ' is available now!',
                                    userID: subscription.users[i]
                                }, function(err, notification) {
                                    added++;
                                    if(!err) {
                                        console.log('notification: ');
                                        console.log(notification);
                                        socketio.sockets.emit(notification.userID + ' notification', 'new');
                                    }
                                });
                            } else {
                                added++;
                            }
                        });
                    }

                    subscription.broadcasted = true;
                    BookSub.update({_id: subscription._id}, subscription, function(err, subscription) {
                        console.log('err' + err);
                        console.log('subscription');
                        console.log(subscription);
                    });

                }
            });

            res.end();
        });

    });
};