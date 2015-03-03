
'use strict';

app.factory('Book', function($q, $http, BookResource, LibraryBook, FavoriteBookAddResource) {
    return {
        add: function(book, libraryID) {
            var deferred = $q.defer();

            if(book.hasOwnProperty('foundInDatabase')===true) {
                book.libraryID = libraryID;
                LibraryBook.add(book).then(function() {
                    deferred.resolve();
                }, function(err) {
                    deferred.reject(err);
                });
            } else {
                var newBook = new BookResource(book);
                newBook.$save().then(function(data) {
                    console.log(libraryID);
                    if(typeof(libraryID) !== 'undefined') {
                        book.libraryID = libraryID;
                        book._id = data._id;
                        LibraryBook.add(book).then(function() {
                            deferred.resolve();
                        }, function(err) {
                            deferred.reject(err);
                        });
                    } else {
                        deferred.resolve();
                    }

                }, function(response) {
                    deferred.reject(response);
                });
            }



            return deferred.promise;
        },
        update: function(book) {
            var deferred = $q.defer();

            var updatedBook = new BookResource(book);
            updatedBook._id = book._id;
            updatedBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        addFavorite: function(book) {
            var deferred = $q.defer();
            console.log(book);
            var favoriteBook = new FavoriteBookAddResource(book);

            favoriteBook.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }
    };
});
