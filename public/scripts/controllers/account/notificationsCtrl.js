'use strict';

app.controller('NotificationsCtrl', function($scope, $http, Socket, NotificationService, identity) {

    // Get current user
    $scope.identity = identity;
    $scope.user = identity.currentUser;

    // Get user notifications function
    var loadNotifications = function(callback) {
        NotificationService.getForUser($scope.user)
        .then(function(notifications) {
            notifications.reverse();
            return callback(notifications);
        });
    };

    /* jshint unused:false */
    /* global Notification: false */
    var triggerDesktopNotification = function(notificationMessage) {
        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        }

        // Let's check if the user is okay to get some notification
        else if (Notification.permission === 'granted') {
            // If it's okay let's create a notification
            var notification = new Notification('New sCOOLbry notification!', {
                body: notificationMessage.replace(/(<([^>]+)>)/ig, ''), // Remove the html tags
                icon: '../../dist/images/favicon.png'
            });
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user is okay, let's create a notification
                if (permission === 'granted') {
                    var notification = new Notification('New sCOOLbry notification!', {
                        body: notificationMessage.replace(/(<([^>]+)>)/ig, ''), // Remove the html tags
                        icon: '../../dist/images/favicon.png'
                    });
                }
            });
        }

        // At last, if the user already denied any notification, and you 
        // want to be respectful there is no need to bother them any more.
    };
    /* global Notification: true */
    /* jshint unused:true */

    // Update notifications (seen->true)
    $scope.markAsSeen = function(notification) {
        notification.seen = true;
        NotificationService.markAsSeen(notification);
    };

    if(!!$scope.user) {

        loadNotifications(function(notifications) {
            $scope.notifications = notifications;
        });

        // Listen for new notifications
        Socket.on($scope.user._id + ' notification added', function(notification) {
            triggerDesktopNotification(notification.message);
            $scope.notifications.unshift(notification);
        });

        // Listen for notification removals
        Socket.on($scope.user._id + ' notification removed', function(notification) {
            for(var i=0; i<$scope.notifications.length; i++) {
                if($scope.notifications[i]._id === notification._id) {
                    $scope.notifications.splice(i, 1);
                    break;
                }
            }
        });
    }
});