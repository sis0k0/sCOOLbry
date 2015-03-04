'use strict';

app.controller('SignUpCtrl', function($scope, $location, User, notifier, $http, $window, $filter) {
    $scope.signup = function() {
        User.signup($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){

            if(reason instanceof Object) {
                notifier.error($filter('titleCase')(reason.name));
                $scope.mongooseErrors = reason.errors;
            } else {
                notifier.error(reason);
            }
            $window.Recaptcha.reload();
        });
    };

    $scope.signupNoCaptcha = function() {
        User.signupNoCaptcha($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){

            if(reason instanceof Object) {
                notifier.error($filter('titleCase')(reason.name));
                $scope.mongooseErrors = reason.errors;
            } else {
                notifier.error(reason);
            }
        });
    };
});