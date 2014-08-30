'use strict';

app.controller('MainCtrl', function($scope, cachedLibraries) {
    $scope.libraries = cachedLibraries.query();

});
