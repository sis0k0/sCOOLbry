'use strict';

app.controller('editProfileAdminCtrl', function($scope, $location, $routeParams, $window, $http, auth, ajaxPost, UserResource) {

	$scope.user = UserResource.get({id: $routeParams.id}, function() {
		$scope.emailConfirm = $scope.user.email;
	});
	console.log($scope.user.ownLibraryID);

	$http({
		method: 'get',
		url: '/api/roles'
	}).success(function(data) {
		$scope.roles = data;
	}).error(function(err) {
		console.log(err);
	});


	$http({
		method: 'get',
		url: '/api/libraries'
	}).success(function(data) {
		$scope.libraries = data;
		$scope.libraryObject = $scope.user.ownLibraryID;
	}).error(function(err) {
		console.log(err);
	});


	$scope.upload = false;


	$scope.updateAsAdmin = function(user) {
		auth.updateAsAdmin(user).then(function() {
			$window.location.href('/admin/users');
		});
	};

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

	$scope.selectLibrary = function(field) {
		console.log($scope.libraryObject);
		$scope.user.ownLibraryID = $scope.libraryObject;
	}


});
