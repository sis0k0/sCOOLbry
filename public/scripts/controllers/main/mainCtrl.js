'use strict';

app.controller('MainCtrl', function($scope, cachedLibraries, identity) {
    $scope.identity = identity;
    console.log($scope.identity);
    $scope.libraries = cachedLibraries.query().then(function(collection) {
        $scope.libraries = collection;
    });

});
