'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, auth, notifier, $location, BookResource, LibraryReadingResource) {
    $scope.bookInfo = BookResource.get({id: $routeParams.id});

    if($routeParams.libraryID!=undefined) {
    	$scope.libraryID = $routeParams.libraryID;
    	$scope.readers = LibraryReadingResource.get({libraryID: $scope.libraryID});
    	console.log($scope.readers);
    }else{
    	$scope.libraryID = -1;
    }

    console.log($scope.libraryID);
});
