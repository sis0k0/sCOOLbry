'use strict';

var Notification = require('mongoose').model('Notification'),
    Subscription = require('mongoose').model('BookAvailabilitySubscription');

module.exports = {
    addFine: function(socketio, amount, userID) {
        Notification.create({
            href: '/profile#fines',
            message: '<strong class="text-info">You<\/strong> have been fined with <strong class="text-info">$' + amount + '<\/strong>!',
            // message: 'You have been fined with <strong class="text-info>"$' + amount + '<\/strong>!',
            date: Date.now(),
            userID: userID
        }, function(error, notification) {
            if(!error) {
                socketio.sockets.emit(userID + ' notification added', notification);
            }
            // Return null or error
            return error;
        });
    },

    addBookAvailable: function(socketio, booking) {

        Subscription
        .findOne({bookID: booking.bookID, libraryID: booking.libraryID, broadcasted: false})
        .exec(function(err, subscription) {

            if(err) {
                console.log('Subscription cannot be found');
                return err;
            } else if(!subscription) {
                console.log('No subscriptions');
                return null;    
            }

            var notifications = [],
                href    = '/book/' + booking.bookID + '/' + booking.libraryID,
                message = '<strong class="text-info">' + booking.bookName + '<\/strong> is available at <strong class="text-info">' + booking.libraryName + '<\/strong> now!',
                date    = Date.now();

            for(var i=0; i<subscription.users.length; i++) {
                var notification = {
                    href: href,
                    message: message,
                    userID: subscription.users[i],
                    date: date
                };
                notifications.push(notification);            
            }

            Notification.collection.insert(notifications, function(err, data) {
                if(err || !data) {
                    console.log('Notifications cannot be inserted: ' + err);
                    return err;
                }

                for(var i=0; i<subscription.users.length; i++) {
                    socketio.sockets.emit(notifications[i].userID + ' notification added', notifications[i]);
                }

                subscription.broadcasted = true;
                Subscription.update({_id: subscription._id}, subscription, function(err) {
                    // Return error or null if no error
                    return err;
                });
            });

        });
    }
};