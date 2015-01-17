'use strict';

app.controller('LibraryDetailsCtrl', function($scope, User, $routeParams, $route, uiGmapGoogleMapApi, BookResource, cachedLibraries, LibBooksResource, UserReadingResource, identity, $http, LibraryUsers, notifier) {

    $scope.user = identity.currentUser;

    $scope.library = cachedLibraries.query().$promise.then(function(collection) {
        collection.forEach(function(library) {
            if (library._id === $routeParams.id) {
                $scope.library = library;
                console.log(library.address);

                uiGmapGoogleMapApi.then(function() {
                    $scope.map = { 
                        center: { latitude: library.address.geometry.location.lat, longitude: library.address.geometry.location.lng },
                        zoom: 16
                    };
                    $scope.marker = {
                        coords: { latitude: library.address.geometry.location.lat, longitude: library.address.geometry.location.lng },
                        idkey: 0
                    };
                });
            }
        });
    });


    $http.get('/api/library/user-count/' + $routeParams.id).success(function(data) {
        $scope.membersCount = data;
    });

    
    $scope.libBooks = LibBooksResource.query({id: $routeParams.id}, function() {

        $scope.booksCount = 0;
        $scope.books = [];
        for(var i=0; i<$scope.libBooks.length; i++) {
            $scope.booksCount += $scope.libBooks[i].total;

            $scope.books[i] = BookResource.get({id: $scope.libBooks[i].bookID}, function() {
            });
        }
    });
    

    if(identity.currentUser===undefined) {
        $scope.isMember = false;
        $scope.isLoggedIn = false;
    }else{
        var responsePromise = $http.get('/api/library/member/'+$routeParams.id+'/'+identity.currentUser._id);
        responsePromise.success(function(data) {
            if(data===true){
                $scope.isMember = true;
            }else{
                $scope.isMember = false;
            }
        });
        console.log($scope.isMember);
        $scope.isLoggedIn = true;
    }
    
    if(identity.currentUser===undefined) {
        $scope.readings = [];
    }else{
        $scope.readings = UserReadingResource.query({ userID: identity.currentUser._id, libraryID: $routeParams.id });
    }
    
    $scope.subscribeForLibrary = function() {
        identity.currentUser.given = 0;
        identity.currentUser.toReturn = 0;
        identity.currentUser.userID = identity.currentUser._id;
        LibraryUsers.addUserToLibrary(identity.currentUser, $routeParams.id).then(function() {
            notifier.success('You\'ve subscribed successfully!');
            $route.reload();
        }, function(reason){
                notifier.error(reason);
            });
    };
    
     $scope.unsubscribeForLibrary = function() {
        var responsePromise = $http.get('/api/library/delete-user/'+identity.currentUser._id+'/'+$routeParams.id);
        responsePromise.success(function() {

            $scope.user.librarySubscriptions.splice($scope.user.librarySubscriptions.indexOf($routeParams.id), 1);
            
            
            User.update($scope.user).then(function() {

                notifier.success('You\'ve unsubscribed successfully!');
                $route.reload();
            }, function(reason) {
                notifier.error(reason);
            });

        
        }).error(function(reason) {
            notifier.error(reason);
        });      
        
    };

});
