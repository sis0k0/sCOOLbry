'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, LibraryUsersInteractions, notifier, $location, BookResource, LibraryReadingResource, LibBookResource, $window) {
    $scope.bookInfo = BookResource.get({id: $routeParams.id});

    if($routeParams.libraryID!=undefined) {

        $scope.libraryID = $routeParams.libraryID;
        $scope.readers   = LibraryReadingResource.get({libraryID: $scope.libraryID});
        $scope.quantity  = LibBookResource.get({libraryID: $scope.libraryID, bookID: $routeParams.id});
        $scope.bookable  = false;

        $http.get('/api/library/booking/'+$scope.libraryID+'/'+$routeParams.id).success(function(data){

            $scope.booked = parseInt(data);

            if(identity.currentUser===undefined) {
                $scope.isMember = false;
                $scope.isLoggedIn = false;
            }else{
                var responsePromise = $http.get('/api/library/member/'+$scope.libraryID+'/'+identity.currentUser._id);
                responsePromise.success(function(data) {

                    if(data==='true'){
                        $scope.isMember = true;
                    }else{
                        $scope.isMember = false;
                    }

                    if(($scope.quantity.available-$scope.booked)>0 && identity.isAuthenticated() && $scope.isMember==true) {
                        $scope.bookable = true;
                    }else{
                        $scope.bookable = false;
                    }
                });      
        
                $scope.isLoggedIn = true;     
            }

        });
        console.log($scope.quantity);

    }else{
    	$scope.libraryID = -1;
    }

    
    $scope.addBooking = function(){
        var booking = new Object({});
        var bookDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
        console.log(bookDate);
        
        booking.userID    = identity.currentUser._id;
        booking.libraryID = $scope.libraryID;
        booking.bookID    = $routeParams.id;
        booking.bookDate  = bookDate;

        LibraryUsersInteractions.addBooking(booking).then(function(){
           notifier.success('Booking added successfully!');
           $window.location.href = '/libraries';
           
        });
    };
});
