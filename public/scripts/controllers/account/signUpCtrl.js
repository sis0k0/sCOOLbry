'use strict';

app.controller('SignUpCtrl', function($scope, $location, User, notifier, $http, $window) {
    $scope.signup = function(user) {
        User.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
                notifier.error(reason);
                $window.Recaptcha.reload();
        });
    };

    $scope.signupNoCaptcha = function(user) {
        User.signupNoCaptcha(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
                notifier.error(reason);
        });
    };
});