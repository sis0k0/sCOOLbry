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

    };


    if(!!$scope.user) {

        $scope.notifications = [];
        $scope.loadNotifications();

        Socket.on($scope.user._id, function(notification) {
            console.log('SOCKET!!');
            console.log(notification);
            $scope.notifications.unshift(notification);
            console.log($scope.notifications);
        });

    }


    
});