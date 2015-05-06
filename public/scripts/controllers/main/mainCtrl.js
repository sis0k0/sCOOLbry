'use strict';

app.controller('MainCtrl', function($scope, $cookies, cachedLibraries, identity) {
    $scope.identity = identity;
    $scope.libraries = cachedLibraries.query().then(function(collection) {
        $scope.libraries = collection;
    });
    if($cookies.locale==='bg') {
    	$scope.flag = 'gb';
    }else{
    	$scope.flag = 'bg';
    }
    console.log($scope.flag);
});
