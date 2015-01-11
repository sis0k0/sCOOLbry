'use strict';

app.controller('BookInfoLibCtrl', function($scope, LibBookResource2, BookResource, $routeParams) {

    $scope.showMore = true;

    $scope.libraryBook = LibBookResource2.get({id: $routeParams.id}, function() {
        $scope.book = BookResource.get({id: $scope.libraryBook.bookID}, function() {
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

    });
   
});
