'use strict';

app.controller('ProfileCtrl', function($scope, identity, LibraryResource, FavouriteBookResource, BookingResourceSortable, notifier) {
    $scope.user = identity.currentUser;

    $scope.user.libraries = [];
    for(var i=0; i<$scope.user.librarySubscriptions.length; i++) {
        $scope.user.libraries[i] = LibraryResource.get({id: $scope.user.librarySubscriptions[i]}, 
            function () {
                $scope.bookings = BookingResourceSortable.query({
                    libraryID: $scope.user.libraries[i],
                    field: $scope.field,
                    order: $scope.order,
                    page: $scope.page,
                    perPage: $scope.perPage
            }, function(err) {
                notifier.error(err.data);
            });

            });
    }

    $scope.favouriteBooks = FavouriteBookResource.get({userID: identity.currentUser._id});


});