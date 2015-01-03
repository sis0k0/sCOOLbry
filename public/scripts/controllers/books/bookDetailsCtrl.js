'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, $route, LibraryUsersInteractions, notifier, $location, BookResource, LibraryReadingResource, LibBookResource, $window, LibraryResource, Book) {
    
    $scope.showMore = true;
    $scope.book = BookResource.get({id: $routeParams.id}, function() {

        if($scope.book.hasOwnProperty('author') && $scope.book.author.indexOf('.') > -1) {
            $scope.book.author = $scope.book.author.substring(0, $scope.book.author.indexOf('.') -2);
        }
        console.log($scope.book);

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




    if($routeParams.libraryID!=undefined) {

        $scope.libraryID = $routeParams.libraryID;
        $scope.readers   = LibraryReadingResource.get({libraryID: $scope.libraryID});
        $scope.quantity  = LibBookResource.get({libraryID: $scope.libraryID, bookID: $routeParams.id});
        $scope.library = LibraryResource.get({id: $scope.libraryID});

        $scope.bookable  = false;
        $scope.notFavourite = true;


        $http.get('/api/library/booking/'+$scope.libraryID+'/'+$routeParams.id).success(function(data){

            $scope.booked = parseInt(data);

            if(identity.currentUser===undefined) {

                $scope.isMember = false;
                $scope.isLoggedIn = false;
            }else{
                var responsePromise = $http.get('/api/library/member/'+$scope.libraryID+'/'+identity.currentUser._id);
                responsePromise.success(function(data) {

                    if(data===true){
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
        


               $http.get('/api/book/isFavourite/'+identity.currentUser._id+'/'+$routeParams.id).success(function(data){

                    console.log(data);
                    if(data===true){
                        $scope.notFavourite = false;
                    }else{
                        $scope.notFavourite = true;
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
        console.log($scope.library);
        var bookDate;

        var workingHours = new Array();
        workingHoursStr.forEach(function(element, index) {

            if(element!==null) {
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
                workingHours[index] = currentDay;
            }

        });
   

        var todayWeekDay = checkDay.getDay();
        var initialDay = checkDay.getDay();
        var add = 0;

        while(workingDays[todayWeekDay]!=true) {
            todayWeekDay++;
            if(todayWeekDay==initialDay){
                break;
            }
            if(todayWeekDay==7) { todayWeekDay = 0; add = true; }
        }
            
        var workingHoursIndex = todayWeekDay;
        var newBookingDate = new Date();
        if(add==true){
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * ((Math.abs(7-initialDay)+(Math.abs(0-todayWeekDay)+1))));
        }else{
            newBookingDate = new Date(checkDay.getTime() + 60 * 60 * 24 * 1000 * (Math.abs(todayWeekDay-initialDay)+add));
        }

        console.log(workingHours);
        console.log(workingHoursIndex+'!');   
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
            $location.path('/libraries');
           
        }, function(err) {
            notifier.error(err.data);
        });
    };

    $scope.addFavourite = function(bookName, bookISBN) {
       
        var favourite = new Object({});
        favourite.bookID = $routeParams.id;
        favourite.bookISBN = bookISBN;
        favourite.libraryID = $scope.libraryID;
        favourite.bookName = bookName;
        favourite.userID = identity.currentUser._id;

        Book.addFavourite(favourite).then(function(){
            notifier.success('Booking added successfully to favourites!');
            $route.reload();
           
        });
    };

    $scope.removeFavourite = function() {
        var responsePromise = $http.get('/api/book/deleteFavourite'+'/'+$routeParams.id);
        responsePromise.success(function(data) {
            notifier.success('You\'ve removed this book from favourites successfully!');
            $route.reload();
        
        }).error(function(reason) {
            notifier.error(reason);
        });

    };
});

