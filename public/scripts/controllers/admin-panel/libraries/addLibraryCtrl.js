'use strict';

app.controller('AddLibraryCtrl', function($scope, $http, $window, auth, notifier, UserResource, ajaxPost) {

	// Get list of all countries to choose from for library's location
	$http({
		method: 'get',
		url: '/api/countries'
	}).success(function(data) {
		$scope.countries = data;
	}).error(function(err) {
		console.log(err);
	});


	// Get list of users to choose from for librarians
	$http({
		method: 'get',
		url: '/api/users'
	}).success(function(data) {

		$scope.users = new Array();
		var b = 0;


		// Check if user is	not already a librarian (you can't be librarian at two places)
		for (var user in data) {

			if(data[user].ownLibraryID==='' || !data[user].ownLibraryID) {
				$scope.users[b] = data[user];
				b++;
			}

		}
	}).error(function(err) {
		console.log(err);
	});

	// For certificate uploading

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
					$scope.library.certificate = result.data;
					$scope.certificateUploadSuccessful = true;
					$scope.certificateUploadError = false;
					$scope.certificateTypeError = false;   
				}
			}, function(error) {
				if(error.data==='Invalid mime type'){
					$scope.certificateTypeError = true;
				}
				else{
					$scope.certificateUploadError = true;
				}
				$scope.certificateError = error.data;
			});
	};
	
	$scope.librarians_count = 1;

	$scope.librarians = new Array();
    
    for(var i = 0; i < $scope.librarians_count; i++) $scope.librarians[i] = new Object({'index': i});
    

    $scope.addLibrarian = function(){

    	$scope.librarians[$scope.librarians_count] = new Object({'index': $scope.librarians_count});
    	$scope.librarians_count++;

    };

    $scope.addLibrary = function(library, librarians) {
        console.log(librarians);
        console.log(library);

        auth.addLibrary(library, librarians);

        //$window.location.href = '/admin/libraries';
        notifier.success('Library added successfully!');

    };



});
