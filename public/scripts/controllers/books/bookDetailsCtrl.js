'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, uiGmapGoogleMapApi, identity, $http, $route, $compile, LibraryUsersInteractions, notifier, $location, $anchorScroll, BookResource, LibraryReadingResource, LibBookResource, $window, LibraryResource, Book) {

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
        console.log(data);

        uiGmapGoogleMapApi.then(function() {

            $scope.libraries = [];
            $scope.randomMarkers = [];
            if($window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(function(success) {
                    $scope.map = { 
                        center: { latitude: success.coords.latitude, longitude: success.coords.longitude },
                        zoom: 8
                    };
                    var marker = {
                        latitude: success.coords.latitude,
                        longitude: success.coords.longitude,
                        icon: '../../dist/images/pinkmarker.png',
                        id: 0,
                        options: {
                            animation: 1
                        }
                    };
                    $scope.randomMarkers.push(marker);

                    var closestLibraryIndex,
                        minDistance = Number.MAX_VALUE;

                    for(var i=0; i<data.length; i++) {
                        LibraryResource.get({id: data[i].libraryID}, function(data) {
                            $scope.libraries.push(data);
                            $scope.libraries[$scope.libraries.length-1].distance = calculateDistance(success.coords.latitude, success.coords.longitude, $scope.libraries[$scope.libraries.length-1].address.geometry.location.lat, $scope.libraries[$scope.libraries.length-1].address.geometry.location.lng);
                            if($scope.libraries[$scope.libraries.length-1].distance<minDistance) {
                                minDistance = $scope.libraries[$scope.libraries.length-1].distance;
                                closestLibraryIndex = $scope.libraries.length-1;
                            }

                            var marker = {
                                latitude: $scope.libraries[$scope.libraries.length-1].address.geometry.location.lat,
                                longitude: $scope.libraries[$scope.libraries.length-1].address.geometry.location.lng,
                                icon: '../../dist/images/bluemarker.png',
                                id: $scope.libraries.length,
                                showWindow: true,
                                options: {
                                    labelContent: $scope.libraries[$scope.libraries.length-1].name,
                                    labelClass: 'marker-labels',
                                    labelAnchor:'24 4'
                                }
                            };
                            $scope.randomMarkers.push(marker);
                            if($scope.libraries.length===i) {
                                console.log(closestLibraryIndex);
                                $scope.randomMarkers[closestLibraryIndex+1].icon = '../../dist/images/greenmarker.png';
                            }
                        });
                    }

                }, function(err) {
                    console.log(err);
                    $scope.map = { 
                        center: { latitude: $scope.libraries[0].address.geometry.location.lat, longitude: $scope.libraries[0].address.geometry.location.lng },
                        zoom: 8
                    };

                    for(var i=0; i<$scope.libraries.length; i++) {
                        var marker = {
                            latitude: $scope.libraries[i].address.geometry.location.lat,
                            longitude: $scope.libraries[i].address.geometry.location.lng,
                            icon: '../../dist/images/bluemarker.png',
                            id: i
                        };
                        $scope.randomMarkers.push(marker);
                    }

                });

            } else {
                console.log('Geolocation is not supported by this browser.');
            }

        });        
    })
    .error(function(err) {
        notifier.error(err);
    });

    //This function takes in latitude and longitude of two location and returns the distance between them (in km)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
        var lat1 = degreesToRadians(lat1);
        var lat2 = degreesToRadians(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function degreesToRadians(value) {
        return value * Math.PI / 180;
    }


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

                        wrapper.append('<timer class="text-center" end-time="reservationEnd"><p>Your reservation ends after:</p><p class="text-info">{{days}} day, {{hours}} hours, {{minutes}} minutes and {{seconds}} seconds</p></timer>');
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

        Book.addFavourite(favorite).then(function(){
            notifier.success('Book added successfully to favorites!');
            $route.reload();
           
        });
    };

    $scope.removeFavorite = function() {
        var responsePromise = $http.get('/api/book/deleteFavourite'+'/'+$routeParams.id);
        responsePromise.success(function() {
            notifier.success('You\'ve removed this book from favorites successfully!');
            $route.reload();
        
        }).error(function(reason) {
            notifier.error(reason);
        });

    };
});

