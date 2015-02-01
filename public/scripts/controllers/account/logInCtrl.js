'use strict';

app.controller('LogInCtrl', function($scope, $location, notifier, identity, User, $window, Socket) {
    $scope.identity = identity;

    Socket.on('book.created', function(book) {
        console.log('SOCKET!!!!');
        console.log(book);
    });

    $scope.login = function(user) {
        User.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/');
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
                $location.path('/');
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
});
