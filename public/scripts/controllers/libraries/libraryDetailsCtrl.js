'use strict';

app.controller('LibraryDetailsCtrl', function($scope, $location, User, $routeParams, $route, BookResource, cachedLibraries, LibBooksResource, UserReadingResource, identity, $http, LibraryUsers, notifier, $window) {

    $scope.user = identity.currentUser;

    $scope.library = cachedLibraries.query().then(function(collection) {
        var found = false;
        collection.every(function(library) {
            if (library._id === $routeParams.id) {
                $scope.library = library;
                found = true;
                return false;
            }
            return true;
        });
        if(!found) {
            $location.path('/404');
        }
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
            console.log(data);
            $scope.isMember = data ? true : false;
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
        

        LibraryUsers.addUserToLibrary(identity.currentUser, $routeParams.id, $scope.library.paid).then(function(data) {
            if($scope.library.paid===false) {
                notifier.success('You\'ve subscribed successfully!');
                $route.reload();
            }else{
                console.log('/api/payment/create/paypal/'+$scope.library.amount+'/USD/subscription/'+data._id);
                $window.location.href = '/api/payment/create/paypal/'+$scope.library.amount+'/USD/subscription/'+data._id;
            }
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
