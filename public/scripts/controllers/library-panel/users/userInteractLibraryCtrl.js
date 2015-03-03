'use strict';

app.controller('UserInteractLibraryCtrl', function($scope, $location, UserResource, $routeParams, $route, $timeout, identity, LibraryUsersInteractions, LibraryResource, notifier, $http, LibBooksResource, UserNotReturnedResource) {
    
    $scope.books = LibBooksResource.query({id: identity.currentUser.ownLibraryID, available: true, userID: $routeParams.id});
    $scope.booksToReturn = UserNotReturnedResource.query({userID: $routeParams.id, libraryID: identity.currentUser.ownLibraryID});
    $scope.library = LibraryResource.get({id: identity.currentUser.ownLibraryID});

    $scope.user = UserResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        } else {
            var url = '/api/library/pending/' + $scope.user.id + '/' + identity.currentUser.ownLibraryID;
            $http.get(url).
            success(function(pendings) {
                // Separate the requests to bookings and readings
                for(var i=0; i<pendings.length; i++) {

                    if(pendings[i].book !== null) {
                        if(pendings[i].type === 'booking') {
                            pendings[i].book.end = pendings[i].end;
                            $scope.bookings.push(pendings[i].book);
                        } else if(pendings[i].type === 'reading') {
                            pendings[i].book.end = pendings[i].end;
                            $scope.readings.push(pendings[i].book);
                        }
                    }
                }
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
        }

    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });

    $scope.bookings = [];
    $scope.readings = [];

    $scope.giveBook = function(give) {

        give.userID      = $routeParams.id;
        give.userName     = $scope.user.username;
        give.libraryID    = identity.currentUser.ownLibraryID;
        give.libraryName  = $scope.library.name;
        give.librarian1ID = identity.currentUser._id;
        give.startDate    = new Date();
        give.endDate      = new Date(new Date().getTime() + 1000*60*60*24*30);

        delete give._id;
        delete give.__v;

        LibraryUsersInteractions.giveBook(give).then(function() {
            notifier.success(give.bookName + ' given successfully!');
            $route.reload();

        }, function(reason){
            notifier.error(reason.data);
        });
    };
    
    $scope.returnBook = function(interact) {

        interact.userID       = $routeParams.id;
        interact.libraryID    = identity.currentUser.ownLibraryID;
        interact.librarian2ID = identity.currentUser._id;
        interact.returnDate   = new Date();
        interact.comment      = $scope.returnBook.comment;

        delete interact._id;
        delete interact.__v;

        LibraryUsersInteractions.returnBook(interact).then(function() {
            notifier.success(interact.bookName + ' returned successfully!');
            $route.reload();
        }, function(reason){
            notifier.error(reason.data);
        });
    };
});
