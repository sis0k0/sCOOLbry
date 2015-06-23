'use strict';

app.controller('LibraryInfoCtrl', function($scope, $location, $http, LibraryResource, LibraryUsersResourceSortable, LibBooksResource, identity, $routeParams) {

    var libraryID = $routeParams.id || identity.currentUser.ownLibraryID;
    console.log(libraryID);

    $scope.library = LibraryResource.get({id: libraryID}, function(data) {
        if(!data) {
            $location.path('/404');
        }

    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });


    $scope.libraryBooks = LibBooksResource.get({id: libraryID});

    $scope.libraryUsers = LibraryUsersResourceSortable.query({id: libraryID}, function(data) {
        console.log(data);
    });

    $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    $http.get('/api/library/user-count/' + libraryID).success(function(data) {
        $scope.membersCount = data;
    });
    
});
