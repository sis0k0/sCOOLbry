'use strict';

app.controller('LibrariesListCtrl', function($scope, $window, cachedLibraries, notifier) {
    cachedLibraries.query().then(function success(data) {

        $scope.libraries = data;
        if($window.navigator.geolocation) {
            $window.navigator.geolocation.watchPosition(function(success) {

                for(var i=0; i<$scope.libraries.length; i++) {
                    $scope.libraries[i].distance = calculateDistance(success.coords.latitude, success.coords.longitude, $scope.libraries[i].address.geometry.location.lat, $scope.libraries[i].address.geometry.location.lng);
                    console.log(calculateDistance(success.coords.latitude, success.coords.longitude, $scope.libraries[i].address.geometry.location.lat, $scope.libraries[i].address.geometry.location.lng));
                    console.log($scope.libraries[i].distance);
                }
                $scope.$apply();


            }, function(err) {
                console.log(err);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, function error(reason) {
        notifier.error(reason);
    });
    $scope.sort = 'distance';




    //This function takes in latitude and longitude of two location and returns the distance between them (in km)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
        var lat1 = degreesToRadians(lat1);
        var lat2 = degreesToRadians(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function degreesToRadians(value) {
        return value * Math.PI / 180;
    }

});
