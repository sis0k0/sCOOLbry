'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, $route, $compile, LibraryUsersInteractions, notifier, $location, $anchorScroll, BookResource, LibraryReadingResource, LibBookResource, $window, LibraryResource, Book) {

    $scope.user = identity.currentUser;

    $scope.showMore = true;
    $scope.book = BookResource.get({id: $routeParams.id}, function() {

        if($scope.book.hasOwnProperty('author') && $scope.book.author.indexOf('.') > -1) {
            $scope.book.author = $scope.book.author.substring(0, $scope.book.author.indexOf('.') -2);
        }
        $scope.otherCharacteristics = new Object({});
        if($scope.book.hasOwnProperty('isbn')) {
            $scope.otherCharacteristics.isbn = $scope.book.isbn;
        }
        if($scope.book.hasOwnProperty('language')) {
            $scope.otherCharacteristics.language = $scope.book.language;
        }
        if($scope.book.hasOwnProperty('authorNationality')) {
            $scope.otherCharacteristics.authorNationality = $scope.book.authorNationality;
        }
        if($scope.book.hasOwnProperty('pages')) {
            $scope.otherCharacteristics.pages = $scope.book.pages;
        }
        if($scope.book.hasOwnProperty('edition')) {
            $scope.otherCharacteristics.edition = $scope.book.edition;
        }
        if($scope.book.hasOwnProperty('illustrated')) {
            $scope.otherCharacteristics.illustrated = $scope.book.illustrated;
        }
        if($scope.book.hasOwnProperty('published')) {
            $scope.otherCharacteristics.published = $scope.book.published;
        }
        if($scope.book.hasOwnProperty('themes')) {
            $scope.otherCharacteristics.themes = $scope.book.themes.join(', ');
        }
        if($scope.book.hasOwnProperty('genres')) {
            $scope.otherCharacteristics.genres = $scope.book.genres.join(', ');
        }
    });


    $scope.gotoOtherLibraries = function() {
      $location.hash('other');
      $anchorScroll();
    };

    $http.get('/api/library/lib-books/'+$routeParams.id)
    .success(function(data) {
        $scope.libraries = [];
        for(var i=0; i<data.length; i++) {
            LibraryResource.get({id: data[i].libraryID}, function(data) {
                $scope.libraries.push(data);
            });
        }
    })
    .error(function(err) {
        notifier.error(err);
    });


    if(typeof $routeParams.libraryID !== 'undefined') {

        $scope.libraryID = $routeParams.libraryID;
        $scope.readers   = LibraryReadingResource.get({libraryID: $scope.libraryID});
        $scope.libBook  = LibBookResource.get({libraryID: $scope.libraryID, bookID: $routeParams.id});
        $scope.library = LibraryResource.get({id: $scope.libraryID});

        $scope.bookable  = false;
        $scope.isFavorite = false;



        $http.get('/api/library/booking/'+$scope.libraryID+'/'+$routeParams.id).success(function(data){

            $scope.bookings = data;

            if(typeof $scope.user === 'undefined') {
                $scope.isMember = false;
            }else{
                $scope.isMember = (typeof $scope.user.librarySubscriptions !== 'undefined' && $scope.user.librarySubscriptions.indexOf($scope.libraryID) > -1) ? true : false;
                
                var flag = false;
                for(var i=0; i<$scope.bookings.length; i++) {
                    if($scope.bookings[i].userID === $scope.user._id) {
                        flag = true;
                        $scope.bookable = false;
                        $scope.booking = $scope.bookings[i];

                        $scope.reservationEnd = $scope.bookings[i].bookDate;

                        var wrapper = angular.element(document.querySelector( '#timerWrapper' ));

                        wrapper.append('<timer class="text-center" end-time="reservationEnd"><p>Your reservation ends after:</p><p class="text-info">{{hours}} hours, {{minutes}} minutes and {{seconds}} seconds</p></timer>');
                        $compile(wrapper)($scope);

                        break;
                    }
                }
                if(!flag) {
                    $scope.bookable = (($scope.libBook.available-$scope.bookings.length)>0 && $scope.isMember) ? true : false;
                }

                $http.get('/api/book/isFavourite/'+identity.currentUser._id+'/'+$routeParams.id).success(function(data){
                    $scope.isFavorite = data ? true : false;
                });
            }

        });

    }else{
        $scope.libraryID = -1;
    }

    $scope.addBooking = function(){
        var booking = new Object({});
        var checkDay = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
        var workingDays = $scope.library.workdays;
        var workingHoursStr = $scope.library.workhours;
        var bookDate;

        var workingHours = [];
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
   

        var todayWeekDay = checkDay.getDay();
        var initialDay = checkDay.getDay();
        var add = 0;

        while(workingDays[todayWeekDay]!==true) {
            todayWeekDay++;
            if(todayWeekDay===initialDay){
                break;
            }
            if(todayWeekDay===7) { todayWeekDay = 0; add = true; }
        }
            
        var workingHoursIndex = todayWeekDay;
        var newBookingDate = new Date();
        if(add===true){
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

        Book.addFavourite(favorite).then(function(){
            notifier.success('Book added successfully to favorites!');
            $route.reload();
           
        });
    };

    $scope.removeFavosrite = function() {
        var responsePromise = $http.get('/api/book/deleteFavourite'+'/'+$routeParams.id);
        responsePromise.success(function() {
            notifier.success('You\'ve removed this book from favorites successfully!');
            $route.reload();
        
        }).error(function(reason) {
            notifier.error(reason);
        });

    };
});

