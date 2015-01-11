'use strict';

app.controller('UserInteractLibraryCtrl', function($scope, UserResource, $routeParams, identity, LibraryUsersInteractions, notifier, $http, $location, LibBooksResource, UserNotReturnedResource) {
    
    $scope.booksToReturn = UserNotReturnedResource.query({userID: $routeParams.id, libraryID: identity.currentUser.ownLibraryID});
    $scope.books = LibBooksResource.query({id: identity.currentUser.ownLibraryID});
    
    $scope.Date = new Date();
    $scope.Date30Days = new Date( new Date().getTime() + 60*60*24*30*1000 );
    $scope.userInfo = UserResource.get({id: $routeParams.id}, function(data){
    
        if(data.dateOfBirth===undefined){
            data.dateOfBirth = 'N/A';
        }
    
        if(data.facebookUrl===undefined){
            data.facebookUrl = 'N/A';
        }
    
        if(data.twitterUrl===undefined){
            data.twitterUrl = 'N/A';
        }
    
        if(data.googlePlusUrl===undefined){
            data.googlePlusUrl = 'N/A';
        }
    
        if(data.aboutMe===undefined){
            data.aboutMe = 'N/A';
        }
        
        
    });
    console.log($scope.books);
    console.log($scope.booksToReturn);
    $scope.bookOption = function(bookName, bookISBN) {

        return bookName+' ('+bookISBN+')';
    };

    $scope.giveBook = function(give) {

        give.userID = $routeParams.id;
        give.libraryID = identity.currentUser.ownLibraryID;
        give.librarian1ID = identity.currentUser._id;
        give.bookID = give.bookInfo.bookID;
        give.bookISBN = give.bookInfo.bookISBN;
        give.bookName = give.bookInfo.bookName;
        delete give.bookInfo;

        LibraryUsersInteractions.giveBook(give).then(function() {
            notifier.success('Book given successfully!');
            $location.path('/library-panel/users');
        }, function(reason){
                notifier.error(reason);
        });
    };
    
    $scope.returnBook = function(interact) {
        interact.userID = $routeParams.id;
        interact.libraryID = identity.currentUser.ownLibraryID;
        interact.librarian2ID = identity.currentUser._id;
        interact.returnDate = new Date();
        LibraryUsersInteractions.returnBook(interact).then(function() {
            notifier.success('Book returned successfully!');
            $location.path('/library-panel/users');
        }, function(reason){
                notifier.error(reason);
        });
    };
});
