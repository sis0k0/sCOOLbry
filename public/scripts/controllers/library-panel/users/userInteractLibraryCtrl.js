'use strict';

app.controller('UserInteractLibraryCtrl', function($scope, UserResource, $routeParams, identity, LibraryUsersInteractions, notifier, $http, LibBooksResource, UserNotReturnedResource) {
    
    $scope.books = LibBooksResource.query({id: identity.currentUser.ownLibraryID, available: true}, function() {
        console.log('books');
        console.log($scope.books);
    });
    $scope.booksToReturn = UserNotReturnedResource.query({userID: $routeParams.id, libraryID: identity.currentUser.ownLibraryID}, function() {
        console.log('return');
        console.log($scope.booksToReturn);
    });

    $scope.$watch('books', function() {
        angular.element(document.querySelector( '.nya-selectpicker' )).selectpicker('refresh');

        console.log('changed');
    });




    $scope.userInfo = UserResource.get({id: $routeParams.id});

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

        give.startDate = new Date();
        give.endDate = new Date(new Date().getTime() + 1000*60*60*24*30);

        delete give.bookInfo;

        LibraryUsersInteractions.giveBook(give).then(function() {
            notifier.success(give.bookName + ' given successfully!');
        }, function(reason){
            notifier.error(reason.data);
        });
    };
    
    $scope.returnBook = function(interact) {
        interact.userID = $routeParams.id;
        interact.libraryID = identity.currentUser.ownLibraryID;
        interact.librarian2ID = identity.currentUser._id;
        interact.returnDate = new Date();
        LibraryUsersInteractions.returnBook(interact).then(function() {
            notifier.success(interact.book.title + ' returned successfully!');
        }, function(reason){
            notifier.error(reason.data);
        });
    };
});
