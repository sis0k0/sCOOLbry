'use strict';

app.controller('NotificationsCtrl', function($scope, $http, Socket, Notification, identity) {

    // Get current user
    $scope.identity = identity;
    $scope.user = identity.currentUser;

    // Get user notifications function
    $scope.loadNotifications = function() {
        Notification.getForUser($scope.user).
        then(function(notifications) {
            notifications.reverse();
            $scope.notifications = notifications;
        });
    };

    // Update notifications (seen->true)
    $scope.markAsSeen = function(notification) {
        notification.seen = true;
        Notification.markAsSeen(notification);
    };

    if(!!$scope.user) {

        $scope.notifications = [];
        $scope.loadNotifications();

        // Listen for new notifications
        Socket.on($scope.user._id + ' notification added', function(notification) {
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