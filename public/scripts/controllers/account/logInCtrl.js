'use strict';

app.controller('LogInCtrl', function($scope, $window, notifier, identity, User, $window) {
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

    $scope.logout = function() {
        User.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $window.location.href = '/';
        });
    };
});
