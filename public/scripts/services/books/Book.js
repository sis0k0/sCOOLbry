'use strict';

app.factory('Book', function($q, $http, BookResource, BooksResource, LibraryBook, FavoriteBookAddResource) {
    return {
        importAll: function(file, matches) {
            
            var deferred = $q.defer();

            var newBooks = new BooksResource({file: file, matches: matches});
            newBooks.$save().then(function(data) {
                console.log(data);
                deferred.resolve();
            }, function(response) {
                console.log(response);
                deferred.reject(response);
            });
            
        },
        add: function(book, libraryID) {
            var deferred = $q.defer();

            function addBook(data) {
                if(book.hasOwnProperty('foundInDatabase')===true || data===true) {
                    book.libraryID = libraryID;
                    book.available = book.total;
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
                            book.available = book.total;
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
            }
            if(book.isbn) {
                var responsePromise = $http.get('/api/isbnAvailable/' + book.isbn);
                responsePromise.success(function(data) {
                    addBook(data);
                }, function(reason) {
                    deferred.reject(reason);
                });
            } else {
                addBook(false);
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
