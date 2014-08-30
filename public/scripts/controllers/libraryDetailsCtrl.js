'use strict';

app.controller('LibraryDetailsCtrl', function($scope, $routeParams, cachedLibraries) {
    $scope.library = cachedLibraries.query().$promise.then(function(collection) {
        collection.forEach(function(library) {
            if (library._id === $routeParams.id) {
                $scope.library = library;
            }
        });
    });
});
