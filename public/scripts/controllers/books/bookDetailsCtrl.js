'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, Socket, $http, $route, $compile, LibraryUsersInteractions, notifier, $location, $anchorScroll, BookResource, LibraryReadingResource, LibBookResource, LibraryBook, $window, LibraryResource, Book) {

    $scope.user = identity.currentUser;

    $scope.showMore = true;

    $scope.book = BookResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        }
    });


    $scope.gotoOtherLibraries = function() {
      $location.hash('other');
      $anchorScroll();
    };

    $scope.downloadEbook = function() {
        console.log($scope.book.ebookUrl);



        $http({
            url: '/api/book/ebook/', 
            method: 'GET',
            params: {path: $scope.book.ebookUrl},
            headers: {
               'Content-type': 'application/epub+zip'
            },
            responseType: 'arraybuffer'
         })
        .success(function(data) {

            // create new blob with the data buffer
            var blob = new Blob([data], {
                type: 'application/epub+zip'
            });
            var objectUrl = URL.createObjectURL(blob);

            // create new hidden anchor element, trigger click and download the file 
            var element = angular.element('<a/>');
            element.attr({
                href: objectUrl,
                target: '_blank',
                download: $scope.book.title + '.epub'
            })[0].click();


        })
        .error(function(err) {
            console.log(err);
            notifier.error(err.reason || err);
        });
    };

    if(typeof $routeParams.libraryID !== 'undefined') {

        $scope.libraryID  = $routeParams.libraryID;
        $scope.readers    = LibraryReadingResource.get({libraryID: $scope.libraryID});
        $scope.libBook    = LibBookResource.get({libraryID: $scope.libraryID, bookID: $routeParams.id});
        $scope.library    = LibraryResource.get({id: $scope.libraryID});
        $scope.available  = false;
        $scope.isFavorite = false;


        var url = '/api/library/booking/'+$scope.libraryID+'/'+$routeParams.id;
        console.log(url);
        $http.get(url).success(function(data){

            console.log(data);
            $scope.bookings = data;

            if(typeof $scope.user === 'undefined') {
                $scope.isMember = false;
            }else{

                // After payments are implemented,
                // a checking should be performed before taking a book

                // var responsePromise = $http.get('/api/library/member/'+$routeParams.id+'/'+identity.currentUser._id);
                // responsePromise.success(function(data) {
                //     console.log(data);
                //     $scope.isMember = data ? true : false;
                // });

                $scope.isMember = (typeof $scope.user.librarySubscriptions !== 'undefined' && $scope.user.librarySubscriptions.indexOf($scope.libraryID) > -1) ? true : false;
                
                $http.get('/api/book/availabilitySubscription/' + $routeParams.id + '/' + $routeParams.libraryID + '/' + $scope.user._id).
                success(function(data) {
                    $scope.subscribedForAvailability = data;
                }).
                error(function(err) {
                    console.log(err);
                    $scope.subscribedForAvailability = false;
                });
                
                var flag = false;
                console.log($scope.bookings);
                for(var i=0; i<$scope.bookings.length; i++) {
                    if($scope.bookings[i].userID === $scope.user._id) {
                        flag = true;
                        $scope.available = false;
                        $scope.booking = $scope.bookings[i];

                        $scope.reservationEnd = $scope.bookings[i].bookDate;
                        console.log($scope.reservationEnd);

                        var wrapper = angular.element(document.querySelector( '#timerWrapper' ));

                        wrapper.append('<timer class="text-center" end-time="reservationEnd"><p>Your reservation ends after:</p><p class="text-info">{{days}} day, {{hours}} hours, {{minutes}} minutes and {{seconds}} seconds</p></timer>');
                        $compile(wrapper)($scope);

                        break;
                    }
                }
                if(!flag) {
                    Socket.on($routeParams.id, function(action) {
                        if(action==='decrease') {
                            $scope.libBook.available--;
                        } else if(action==='increase') {
                            $scope.libBook.available++;

                            // Remove subscription, if the notification is already broadcasted
                            if($scope.subscribedForAvailability===true) {
                                $scope.subscribedForAvailability = false;
                            }
                        }
                        $scope.available = (($scope.libBook.available-$scope.bookings.length)>0 && $scope.isMember) ? true : false;
                    });
                    $scope.available = (($scope.libBook.available-$scope.bookings.length)>0 && $scope.isMember) ? true : false;
                }

                $http.get('/api/book/isFavorite/'+identity.currentUser._id+'/'+$routeParams.id).success(function(data){
                    $scope.isFavorite = data ? true : false;
                });
            }


        });

    }

    $scope.addBooking = function(){
        var booking = new Object({}),
            checkDay = new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            workingDays = $scope.library.workdays,
            workingHoursStr = $scope.library.workhours,
            workingHours = [];

        workingHoursStr.forEach(function(element, index) {

            if(element!==null) {
                var currentDay = [];
                var currentSplit = element.split('-');
                var openingSplit = currentSplit[0];
                var closingSplit = currentSplit[1];
                openingSplit = openingSplit.split(':');
                openingSplit = openingSplit[0];
                closingSplit = closingSplit.split(':');
                closingSplit = closingSplit[0];
                currentDay.push(openingSplit);
                currentDay.push(closingSplit);
                workingHours[index] = currentDay;
            }

        });
   

        var todayWeekDay = checkDay.getDay(),
            initialDay = checkDay.getDay(),
            add = 0;

        while(workingDays[todayWeekDay]!==true) {
            todayWeekDay++;
            if(todayWeekDay===initialDay){
                break;
            }
            if(todayWeekDay===7) { todayWeekDay = 0; add = true; }
        }
            
        var workingHoursIndex = todayWeekDay,
            newBookingDate = new Date();

        if(add===true){
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * ((Math.abs(7-initialDay)+(Math.abs(0-todayWeekDay)+1))));
        }else{
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * (Math.abs(todayWeekDay-initialDay)+add));
        }

        newBookingDate.setHours(workingHours[workingHoursIndex][1]);

        newBookingDate.setMinutes(0);
        newBookingDate.setSeconds(0);
        
        booking.userID      = identity.currentUser._id;
        booking.userName    = identity.currentUser.username;
        booking.libraryID   = $scope.libraryID;
        booking.libraryName = $scope.library.name;
        booking.bookID      = $routeParams.id;
        booking.bookName    = $scope.book.title;
        booking.bookDate    = newBookingDate;

        LibraryUsersInteractions.addBooking(booking).then(function(){
            notifier.success('Booking added successfully!');
            $route.reload();
        }, function(err) {
            notifier.error(err.data);
        });
    };

    $scope.removeBooking = function() {
        LibraryUsersInteractions.removeBooking($scope.booking).then(function(){
            notifier.success('Booking removed successfully!');
            $route.reload();
        }, function(err) {
            notifier.error(err.data);
        });
    };

    $scope.addFavorite = function(bookName, bookISBN) {
       
        var favorite = new Object({});
        favorite.bookID = $routeParams.id;
        favorite.bookISBN = bookISBN;
        favorite.libraryID = $scope.libraryID;
        favorite.bookName = bookName;
        favorite.userID = identity.currentUser._id;

        Book.addFavorite(favorite).then(function(){
            notifier.success('Book added successfully to favorites!');
            $scope.isFavorite = true;
           
        });
    };

    $scope.removeFavorite = function() {
        var responsePromise = $http.get('/api/book/deleteFavorite/' + identity.currentUser._id + '/' + $routeParams.id + '/' + $routeParams.libraryID);
        responsePromise.success(function() {
            notifier.success('You\'ve removed this book from favorites successfully!');
            $scope.isFavorite = false;
        
        }).error(function(reason) {
            notifier.error(reason);
        });

    };

    $scope.subscribeForAvailabilityNotification = function() {
        var subscription = {
            userID: $scope.user._id,
            libraryID: $routeParams.libraryID,
            bookID: $routeParams.id
        };
        LibraryBook.subscribeForAvailabilityNotification(subscription).then(function() {
            notifier.success('You will be notified when the book is available!');
            $scope.subscribedForAvailability = true;
        }).error(function(reason) {
            notifier.error(reason);
        });
    };

    $scope.unsubscribeForAvailabilityNotification = function() {

        $http.delete('/api/book/availabilitySubscription/' + $routeParams.id + '/' + $routeParams.libraryID + '/' + $scope.user._id).
        success(function(data) {
            notifier.success('Your subscription was deleted!');
            $scope.subscribedForAvailability = false;
            console.log(data);
        }).
        error(function(err) {
            console.log(err);
        });
    };
});

