'use strict';

app.controller('LibraryInfoCtrl', function($scope, $location, $http, LibraryResource, LibraryUsersResourceSortable, uiGmapGoogleMapApi, LibBooksResource, $routeParams) {

    $scope.library = LibraryResource.get({id: $routeParams.id}, function(data) {
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


    $scope.libraryBooks = LibBooksResource.get({id: $routeParams.id});

    $scope.libraryUsers = LibraryUsersResourceSortable.query({id: $routeParams.id}, function(data) {
        console.log(data);
    });

    $http.get('/api/library/user-count/' + $routeParams.id).success(function(data) {
        $scope.membersCount = data;
    });
    
});
