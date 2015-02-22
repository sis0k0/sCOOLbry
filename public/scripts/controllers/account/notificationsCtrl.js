'use strict';

app.controller('NotificationsCtrl', function($scope, $http, Socket, User, identity) {

    $scope.identity = identity;
    $scope.user = identity.currentUser;

    $scope.loadNotifications = function() {
        User.getNotifications($scope.user).
        then(function(notifications) {
            console.log(notifications);
            notifications.reverse();
            console.log(notifications);

            $scope.notifications = notifications;
        });
    };

    $scope.markAsRead = function(notification) {
        notification.seen = true;
        User.markNotificationAsSeen(notification).
        then(function(returnedValue) {
            console.log('ctrl');
            console.log(returnedValue);
        });

    };


    if(!!$scope.user) {

        $scope.notifications = [];
        $scope.loadNotifications();

        Socket.on($scope.user._id + ' notification removed', function(notification) {
            console.log('emitted !!');
            console.log(notification);
            for(var i=0; i<$scope.notifications.length; i++) {
                console.log($scope.notifications[i]);
                if($scope.notifications[i]._id === notification._id) {
                    console.log('found!!');
                    $scope.notifications.splice(i, 1);
                    break;
                }
            }
        });

        Socket.on($scope.user._id + ' notification added', function(notification) {
            console.log('SOCKET!!');
            console.log(notification);
            $scope.notifications.unshift(notification);
        });

    }


    
});