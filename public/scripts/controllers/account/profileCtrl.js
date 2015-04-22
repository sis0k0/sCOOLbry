'use strict';

app.controller('ProfileCtrl', function($scope, $http, $timeout, $location, notifier, identity, UserResource, LibraryResource, FavoriteBookResource, UserReadingProfileResource, UserBookingsResource, UserFinesResource) {
    $scope.user = UserResource.get({id: identity.currentUser._id}, function(data){
        if(!data) {
            $location.path('/404');
        } else {
            data.dateOfBirth = data.dateOfBirth || 'N/A';
            data.facebookUrl = data.facebookUrl || 'N/A';
            data.twitterUrl = data.twitterUrl || 'N/A';
            data.googlePlusUrl = data.googlePlusUrl || 'N/A';
            data.aboutMe = data.aboutMe || 'N/A';
        }

        data.libraries = [];
        data.readings = UserReadingProfileResource.get({userID: data._id });
        data.bookings = UserBookingsResource.get({userID: data._id});

        for(var lib = 0; lib < data.librarySubscriptions.length; lib++) {
            data.libraries[lib] = LibraryResource.get({id: data.librarySubscriptions[lib]});
        }

    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });

    $scope.favoriteBooks = FavoriteBookResource.get({userID: identity.currentUser._id});
    $scope.fines = UserFinesResource.get({userID: identity.currentUser._id});
});