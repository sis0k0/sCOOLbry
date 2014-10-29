'use strict';

app.controller('LibraryInfoCtrl', function($scope, LibraryResource, LibBooksResource, $routeParams) {
    $scope.libraryInfo = LibraryResource.get({id: $routeParams.id});
    var libBookArr = LibBooksResource.get({id: $routeParams.id});
    $scope.libBookInfo = libBookArr;
    
});
