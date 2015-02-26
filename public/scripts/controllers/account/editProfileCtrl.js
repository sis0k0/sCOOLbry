'use strict';

app.controller('EditProfileCtrl', function($scope, $location, User, identity, ajaxPost, $window, $http, notifier) {

    $scope.user = identity.currentUser;

    
    $scope.upload = false;

    $scope.emailConfirm = $scope.user.email;
    $scope.update = function(user) {
        User.update(user).then(function() {
            $scope.user = user;
            $location.path('/profile');
            notifier.success('Profile updated!');
        }, function(reason) {
            notifier.error(reason); 
        });
    };

    $scope.today = new Date();

    $scope.setFileEventListener = function(element) {
            $scope.uploadedFile = element.files[0];

            if ($scope.uploadedFile) {
                $scope.$apply(function() {
                    $scope.uploadButtonState = true;
                });
            }
    };

    $scope.uploadFile = function() {
        if (!$scope.uploadedFile) {
            return;
    }

    ajaxPost.uploadFileInit($scope.uploadedFile)
        .then(function(result) {
            if (result.status === 200) {
                $scope.user.avatar = result.data;
                $scope.avatarUploadSuccessful = true;
                $scope.avatarUploadError = false;
                $scope.avatarTypeError = false;   
            }
        }, function(error) {
            console.log(error);
            if(error.data==='Invalid mime type'){
                $scope.avatarTypeError = true;
            }
            else{
                $scope.avatarUploadError = true;
            }
            $scope.avatarError = error.data;
        });              
    };

});
