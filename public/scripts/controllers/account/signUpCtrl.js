'use strict';

app.controller('SignUpCtrl', function($scope, $location, User, notifier, $http, $window, $filter) {

    // Handle error function
    var handleError = function(reason) {
        if(reason instanceof Object) {
            notifier.error($filter('titleCase')(reason.name));
            $scope.mongooseErrors = reason.errors;
        } else {
            notifier.error(reason);
        }
    };

    // Signup with captcha challenge (production mode)
    $scope.signup = function() {
        User.signup($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
            handleError(reason);
            $window.Recaptcha.reload();
        });
    };

    // Signup without captcha challenge (development mode)
    $scope.signupNoCaptcha = function() {
        User.signupNoCaptcha($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
            handleError(reason);
        });
    };
});