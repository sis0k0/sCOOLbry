app.controller('EditProfileCtrl', function($scope, $location, auth, identity, ajax_post, $window, $http) {

	$scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        email: identity.currentUser.email,
        avatar: identity.currentUser.avatar,
        gender: identity.currentUser.gender,
        dateOfBirth: identity.currentUser.dateOfBirth,
        facebookUrl: identity.currentUser.facebookUrl,
        twitterUrl: identity.currentUser.twitterUrl,
        googlePlusUrl: identity.currentUser.googlePlusUrl,
        aboutMe: identity.currentUser.aboutMe
    }
    
    $scope.upload = false;

    $scope.emailConfirm = $scope.user.email;

	$scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.user = user;
            $window.location = '/profile';
        });
    }

    $scope.getMonth = function(user) {
        console.log('test');
        auth.getMonth(user);
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
	    if (!$scope.uploadedFile) {
	        return;
	    }

	    ajax_post.uploadFile_init($scope.uploadedFile)
	        .then(function(result) {
	            if (result.status == 200) {
					
	                $scope.user.avatar = result.data;
	                
	            }
	        }, function(error) {
	            alert(error.message);
	    	});
	    	
	    
		 
	                
	};

    $scope.checkIfTaken = function(field){
		
	    var responsePromise = $http.get("/api/" + field.$name + "Taken/" + field.$viewValue);
	    responsePromise.success(function(data, status, headers, config) {
            if(data=="true"){
                field.$setValidity("taken", false);
            }else{
                field.$setValidity("taken", true);
            }
	    });           
    }

    $scope.fieldsMatch = function (field, confirmField) {
		if(field.$viewValue !== confirmField.$viewValue){
			confirmField.$setValidity("notMatching", false);
		}else{
			confirmField.$setValidity("notMatching", true);
		}
	}


	$scope.imageValidate = function(){
		alert('im in');
		console.log($scope.upFile);

		var extension = $scope.upFile.substring($scope.upFile.lastIndexOf('.') + 1).toLowerCase();

		console.log($scope.extension);
		if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
			console.log('True');
		}else {
			console.log('False');
		}
	}

});
