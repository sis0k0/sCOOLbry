'use strict';

app.controller('LibraryInfoCtrl', function($scope, $location, $http, LibraryResource, LibraryUsersResourceSortable, uiGmapGoogleMapApi, LibBooksResource, identity, $routeParams) {

    var libraryID = $routeParams.id || identity.currentUser.ownLibraryID;
    console.log(libraryID);

    $scope.library = LibraryResource.get({id: libraryID}, function(data) {
        if(!data) {
            $location.path('/404');
        } else {


            uiGmapGoogleMapApi.then(function() {
                $scope.map = { 
                    center: { latitude: $scope.library.address.geometry.location.lat, longitude: $scope.library.address.geometry.location.lng },
                    zoom: 16
                };
                $scope.marker = {
                    coords: { latitude: $scope.library.address.geometry.location.lat, longitude: $scope.library.address.geometry.location.lng },
                    idkey: 0,
                    icon: '../../dist/images/bluemarker.png',
                    options: {
                        animation: 1,
                        labelContent: $scope.library.name,
                        labelClass: 'marker-labels',
                        labelAnchor:'24 4'
                    }
                };
            });
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
