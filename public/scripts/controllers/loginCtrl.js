app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth, $window) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
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

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
});
