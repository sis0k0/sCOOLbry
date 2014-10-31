'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, LibraryUsersInteractions, notifier, $location, BookResource, LibraryReadingResource, LibBookResource, $window, LibraryResource) {
    $scope.bookInfo = BookResource.get({id: $routeParams.id});

    if($routeParams.libraryID!=undefined) {

        $scope.libraryID = $routeParams.libraryID;
        $scope.readers   = LibraryReadingResource.get({libraryID: $scope.libraryID});
        $scope.quantity  = LibBookResource.get({libraryID: $scope.libraryID, bookID: $routeParams.id});
        $scope.library = LibraryResource.get({id: $scope.libraryID});

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
        var checkDay = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
        var workingDays = $scope.library.workdays;
        var workingHoursStr = $scope.library.workhours;
        var bookDate;

        var workingHours = new Array();
        workingHoursStr.forEach(function(element) {
            var currentDay = new Array();
            var currentSplit = element.split("-");
            var openingSplit = currentSplit[0];
            var closingSplit = currentSplit[1];
            openingSplit = openingSplit.split(":");
            openingSplit = openingSplit[0];
            closingSplit = closingSplit.split(":");
            closingSplit = closingSplit[0];
            currentDay.push(openingSplit);
            currentDay.push(closingSplit);
            workingHours.push(currentDay);
        });
   

        var todayWeekDay = checkDay.getDay();
        var initialDay = checkDay.getDay();
        var add = 0;

        while(!(workingDays.indexOf(todayWeekDay)>=0)) {
            todayWeekDay++;
            if(todayWeekDay==initialDay){
                break;
            }
            if(todayWeekDay==7) { todayWeekDay = 0; add = true; }
        }
            
        var workingHoursIndex = workingDays.indexOf(todayWeekDay);
        var newBookingDate = new Date();
        if(add==true){
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * ((Math.abs(7-initialDay)+(Math.abs(0-todayWeekDay)+1))));
        }else{
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * (Math.abs(todayWeekDay-initialDay)+add));
        }
        
        newBookingDate.setHours(workingHours[workingHoursIndex][1]);
        newBookingDate.setMinutes(0);
        newBookingDate.setSeconds(0);
        
        bookDate = newBookingDate;

        
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
