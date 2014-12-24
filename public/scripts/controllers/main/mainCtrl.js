'use strict';

app.controller('MainCtrl', function($scope, cachedLibraries, identity) {
	$scope.testUser = new Object({});
	$scope.testUser.username = 'sis0k0';
	$scope.testUser.firstName = 'Stanimira';
	$scope.testUser.lastName = 'Vlaeva';
	$scope.testUser._id = 'asdfglls1';

	$scope.identity = identity;
    $scope.libraries = cachedLibraries.query();

});
