'use strict';

app.controller('editProfileAdminCtrl', function($scope, $location, auth, ajax_post, UserResource, $routeParams, $http) {

    $scope.user = UserResource.get({id: $routeParams.id});
	
	console.log($scope.user);

	$scope.upload = false;

    $scope.emailConfirm = $scope.user.email;

	$scope.updateAsAdmin = function(user) {
        auth.updateAsAdmin(user).then(function() {
            $location.path('/admin/users');
        });
    };

	$scope.setFileEventListener = function(element) {
	        $scope.uploadedFile = element.files[0];

	        if ($scope.uploadedFile) {
	            $scope.$apply(function() {
	                $scope.upload_button_state = true;
	            });   
	        }
	    };

	$scope.uploadFile = function() {
	    if (!$scope.uploadedFile) {
	        return;
	    }

	    ajax_post.uploadFileInit($scope.uploadedFile)
	        .then(function(result) {
	            if (result.status === 200) {
	                $scope.user.avatar = result.data;
	                $scope.avatarUploadSuccessful = true;
	                $scope.avatarUploadError = false;
	                $scope.avatarTypeError = false;   
	            }
	        }, function(error) {
				if(error.data==='Invalid mime type'){
					$scope.avatarTypeError = true;
				}
				else{
	            	$scope.avatarUploadError = true;
	    		}
	            $scope.avatarError = error.data;
	    	});
	};

    $scope.checkIfTaken = function(field){
		
	    var responsePromise = $http.get('/api/' + field.$name + 'Taken/' + field.$viewValue);
	    responsePromise.success(function(data) {
            if(data==='true'){
                field.$setValidity('taken', false);
            }else{
                field.$setValidity('taken', true);
            }
	    });           
    };

    $scope.fieldsMatch = function (field, confirmField) {
		if(field.$viewValue !== confirmField.$viewValue){
			confirmField.$setValidity('notMatching', false);
		}else{
			confirmField.$setValidity('notMatching', true);
		}
	};
});
