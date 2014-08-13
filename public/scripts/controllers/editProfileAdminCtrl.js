app.controller('editProfileAdminCtrl', function($scope, $location, auth, ajax_post, UserResource, $routeParams) {

    $scope.user = UserResource.get({id: $routeParams.id}, function(data){

	});
	
	console.log($scope.user);

	$scope.updateAsAdmin = function(user) {
        auth.updateAsAdmin(user).then(function() {
            $location.path('/admin/users');
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
	                $scope.storeDB_upload_button_state = true;
	                console.log(result);
	                $scope.user.avatar = result.data;
	            }
	        }, function(error) {
	            alert(error.message);
	        });
	}

});
