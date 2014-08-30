'use strict';

app.controller('LibraryInfoCtrl', function($scope, LibraryResource, $routeParams) {
    $scope.libraryInfo = LibraryResource.get({id: $routeParams.id});
    
   
});
