'use strict';

app.controller('LibrariesListCtrl', function($scope, cachedLibraries) {
    $scope.libraries = cachedLibraries.query();
});
