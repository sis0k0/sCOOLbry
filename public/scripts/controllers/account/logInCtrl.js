'use strict';

app.controller('LogInCtrl', function($scope, $location, notifier, identity, User, $window) {

    $scope.identity = identity;

    $scope.login = function(user) {
        User.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $window.location.href = '/';
            }
            else {
                notifier.error('Username/Password combination is not valid or the RECAPTCHA Challenge is not complete!');
                $window.Recaptcha.reload();
            }

        });
    };

    $scope.loginNoCaptcha = function(user) {
        User.loginNoCaptcha(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $window.location.href = '/';
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function() {
        User.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        });
    };


    $scope.loadNotifications = function() {
        console.log($scope.identity);
        if(!!$scope.identity.currentUser) {
            User.getNotifications($scope.identity.currentUser).
            then(function(notifications) {
                console.log(notifications);
                $scope.notifications = notifications;
            });
        }
    };

    $scope.loadNotifications();


});
