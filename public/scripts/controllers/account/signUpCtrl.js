'use strict';

app.controller('SignUpCtrl', function($scope, $location, User, notifier, $http, $window, $filter) {
    $scope.signup = function(form) {
        User.signup($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){

            if(!(reason instanceof Object)) {
                notifier.error(reason);
            } else {

                for (var key in form) {
                    if( form[key] && form[key].$error ) {
                        form[key].$error.mongoose = null;
                        form[key].$invalid = false;
                        form[key].$valid = true;
                    }
                }

                notifier.error($filter('titleCase')(reason.name));
                $scope.mongooseErrors = reason.errors;
                for(var field in reason.errors) {
                    form[field].$error.mongoose = reason.errors[field].message;
                    form[field].$invalid = true;
                    form[field].$valid = false;
                }
            }
            $window.Recaptcha.reload();
        });
    };

    $scope.signupNoCaptcha = function(form) {
        User.signupNoCaptcha($scope.user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
            
            if(!(reason instanceof Object)) {
                notifier.error(reason);
            } else {

                for (var key in form) {
                    if( form[key] && form[key].$error ) {
                        form[key].$error.mongoose = null;
                        form[key].$invalid = false;
                        form[key].$valid = true;
                    }
                }

                notifier.error($filter('titleCase')(reason.data.reason.name));
                for(var field in reason.data.reason.errors) {
                    form[field].$error.mongoose = reason.data.reason.errors[field].message;
                    form[field].$invalid = true;
                    form[field].$valid = false;
                }
            }
        });
    };
});