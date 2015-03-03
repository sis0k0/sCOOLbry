'use strict';

app.controller('LibraryInfoCtrl', function($scope, $location, LibraryResource, LibBooksResource, $routeParams) {

    $scope.library = LibraryResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        } else {
            $scope.libraryBooks = LibBooksResource.get({id: $routeParams.id});
        }        
    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });
    
});
