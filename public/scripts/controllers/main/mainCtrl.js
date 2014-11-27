'use strict';

app.controller('MainCtrl', function($scope, cachedLibraries, identity) {
	$scope.identity = identity;
    $scope.libraries = cachedLibraries.query();

});
