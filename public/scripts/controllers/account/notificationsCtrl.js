'use strict';

app.controller('NotificationsCtrl', function($scope, $http, Socket, User, identity) {

    $scope.identity = identity;
    $scope.user = identity.currentUser;

    $scope.loadNotifications = function() {
        User.getNotifications($scope.user).
        then(function(notifications) {
            console.log(notifications);
            $scope.notifications = notifications;
        });
    };


    if(!!$scope.user) {

        $scope.notifications = [];
        $scope.loadNotifications();

        Socket.on($scope.user._id, function(action) {
            console.log('SOCKET!!');
            console.log(action);
            $scope.notifications.push(action);
            console.log($scope.notifications);
        });

    }


    
});