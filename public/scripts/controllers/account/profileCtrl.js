'use strict';

app.controller('ProfileCtrl', function($scope, $http, $timeout, identity, UserResource, LibraryResource, FavoriteBookResource, UserReadingProfileResource, UserBookingsResource, notifier, $location) {
    $scope.user = UserResource.get({id: identity.currentUser._id}, function(data){
        if(!data) {
            $location.path('/404');
        } else {

            if(data.dateOfBirth===undefined){
                data.dateOfBirth = 'N/A';
            }
        
            if(data.facebookUrl===undefined){
                data.facebookUrl = 'N/A';
            }
        
            if(data.twitterUrl===undefined){
                data.twitterUrl = 'N/A';
            }
        
            if(data.googlePlusUrl===undefined){
                data.googlePlusUrl = 'N/A';
            }
        
            if(data.aboutMe===undefined){
                data.aboutMe = 'N/A';
            }
            
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

});