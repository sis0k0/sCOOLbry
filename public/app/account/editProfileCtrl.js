app.controller('EditProfileCtrl', function($scope, $location, auth, identity, ajax_post) {

	$scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        email: identity.currentUser.email,
        roles: identity.currentUser.roles,
        avatar: identity.currentUser.avatar,
        gender: identity.currentUser.gender,
        dateOfBirth: identity.currentUser.dateOfBirth,
        facebookUrl: identity.currentUser.facebookUrl,
        twitterUrl: identity.currentUser.twitterUrl,
        googlePlusUrl: identity.currentUser.googlePlusUrl,
        aboutMe: identity.currentUser.aboutMe
    }


	$scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.email = user.email,
            $scope.roles = user.roles;
            $scope.avatar = user.avatar;
            $scope.gender = user.gender;
            $scope.dateOfBirth = user.dateOfBirth;
            $scope.facebookUrl = user.facebookUrl;
            $scope.twitterUrl = user.twitterUrl;
            $scope.googlePlusUrl = user.googlePlusUrl;
            $scope.aboutMe = user.aboutMe;
        
            $location.path('/');
        });
    }


	$scope.setFileEventListener = function(element) {
	        $scope.uploadedFile = element.files[0];

	        if ($scope.uploadedFile) {
	            $scope.$apply(function() {
	                $scope.upload_button_state = true;
	            });   
	        }
	    }

	$scope.uploadFile = function() {
	    uploadFile();
	};


	function uploadFile() {
	    if (!$scope.uploadedFile) {
	        return;
	    }

	    ajax_post.uploadFile_init($scope.uploadedFile)
	        .then(function(result) {
	            if (result.status == 200) {
	                $scope.storeDB_button_state = true;
	                clientInfo.imagePath = "/uploadsfolder/" + $scope.uploadedFile.name;

	            }
	        }, function(error) {
	            alert(error.message);
	        });
	}

});
