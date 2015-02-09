'use strict';

app.controller('ProfileCtrl', function($scope, $http, $timeout, identity, LibraryResource, FavouriteBookResource, BookingResourceSortable, notifier) {
    $scope.user = identity.currentUser;

    $scope.user.libraries = [];
    if(typeof $scope.user.ownLibraryID !== 'undefined') {

        var url = '/api/library/pending/' + $scope.user.id + '/' + $scope.user.ownLibraryID;
        $http.get(url).
        success(function(pendings) {
            // Separate the requests to bookings and readings
            for(var i=0; i<pendings.length; i++) {

                if(pendings[i].book !== null) {

                    pendings[i].book.end = pendings[i].end;
                    pendings[i].book.libraryName = pendings[i].library.name;
                    pendings[i].book.libraryID = pendings[i].library.id;

                    if(pendings[i].type === 'booking') {
                        pendings[i].book.libraryName = pendings[i].library.name;
                        $scope.bookings.push(pendings[i].book);
                    } else if(pendings[i].type === 'reading') {
                        $scope.readings.push(pendings[i].book);
                    }
                }
            }

            console.log($scope.bookings);
            console.log($scope.readings);
            if($scope.bookings.length>0) {
                $scope.bookings[0].open = true;
            }
            if($scope.readings.length>0) {
                $scope.readings[0].open = true;
            }
        }).
        error(function(err) {
            notifier.error(err.data);
        });

        $scope.bookings = [];
        $scope.readings = [];

        var iteratorBookings = 0,
            iteratorReadings = 0;

        var openNextTab = function() {
            if($scope.bookings.length>0) {
                $scope.bookings[iteratorBookings].open = true;
                iteratorBookings = (iteratorBookings<$scope.bookings.length-1) ? ++iteratorBookings : 0;
            }
            if($scope.readings.length>0) {
                $scope.readings[iteratorReadings].open = true;
                iteratorReadings = (iteratorReadings<$scope.readings.length-1) ? ++iteratorReadings : 0;
            }
            $timeout(openNextTab, 5000);
        };

        openNextTab();
    }

    $scope.favouriteBooks = FavouriteBookResource.get({userID: identity.currentUser._id});


});