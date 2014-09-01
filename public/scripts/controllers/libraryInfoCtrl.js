'use strict';

app.controller('LibraryInfoCtrl', function($scope, LibraryResource, LibBookResource, $routeParams) {
    $scope.libraryInfo = LibraryResource.get({id: $routeParams.id});
    var libBookArr = LibBookResource.get({id: $routeParams.id});
    $scope.libBookInfo = libBookArr;
    
});
