'use strict';

app.factory('Library', function($http, $q, UsersResource, UserResource, identity, LibraryResource, LibrarianResource) {
    return {
        registerLibrary: function(library, librarian) {
            var deferred = $q.defer(),
                newUser = new UsersResource(librarian);


            // Create new user - the library owner's profile
            newUser.$save().then(function(userData) {

                // Create the new library
                library.librarians = userData._id;
                var newLibrary = new LibraryResource(library);
                newLibrary._id = userData.ownLibraryID;

                newLibrary.$save().then(function(libraryData) {

                    // Update the owner's profile to hold the library ID as ownLibraryID
                    librarian.ownLibraryID = libraryData._id;
                    var updatedUser = new UsersResource(librarian);
                    updatedUser._id = userData._id;

                    updatedUser.$update().then(function() {
                        identity.currentUser = updatedUser;
                        deferred.resolve();
                    }, function(response) {
                        deferred.reject(response.data.reason);
                    });
                }, function(response) {
                    deferred.reject(response.data.reason);
                });

            }, function(response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;

        },

        addLibrary: function(library, librarians) {
            var deferred = $q.defer(),
                newLibrary = new LibraryResource(library),
                libraryID;
            
            // Save the library
            newLibrary.$save(function(data) {
                libraryID = data._id;

                var newLibrariansCount = 0,
                    librariansUpdatedCount = 0;

                // Link the librarians to the created library
                librarians.forEach(function(element){
                    element.ownLibraryID = libraryID;
                    var newUser = new LibrarianResource(element);
                    newUser.$save().then(function(data) {

                        console.log('saved');
                        console.log(data);

                        $http({
                            method: 'get',
                            url: '/api/library/addLibrarian/'+libraryID+'/'+data._id
                        }).then(function(){
                            newLibrariansCount++;

                            if(newLibrariansCount===librarians.length && (!library.librarians || librariansUpdatedCount===library.librarians.length)) {
                                deferred.resolve();
                            }
                            
                        }, function(err) {
                            deferred.reject(err);
                        });
                    }, function(err) {
                        console.log('rejected');
                        console.log(err);

                        deferred.reject(err);
                    });
                });

                // Link the library to the librarians' profiles
                for (var id in library.librarians) {

                    var user = UserResource.get({id: library.librarians[id]._id});

                    user.ownLibraryID = libraryID;
                    
                    var updatedUser = new UsersResource(user);
                    updatedUser._id = library.librarians[id]._id;
                    updatedUser.$update().then(function(){
                        librariansUpdatedCount++;

                        if((!librarians || newLibrariansCount===librarians.length) && librariansUpdatedCount===library.librarians.length) {
                            deferred.resolve();
                        }

                    }, function(reason) {
                        deferred.reject(reason);
                    });

                }
                library._id = libraryID;

            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        updateLibrary: function(library, librarians) {
            var deferred = $q.defer();
            var libraryID;
            var updatedLibrary = new LibraryResource(library);
            
            // Update the library
            updatedLibrary.$update().then(function(data) {
                libraryID = data._id;

                var newLibrariansCount = 0,
                    librariansUpdatedCount = 0;

                // Link the librarians to the updated library
                librarians.forEach(function(element){

                    element.ownLibraryID = libraryID;
                    var newUser = new LibrarianResource(element);
                    newUser.$save().then(function(data) {

                        console.log('saved');
                        console.log(data);

                        $http({
                            method: 'get',
        cache: true,
                            url: '/api/library/addLibrarian/'+libraryID+'/'+data._id
                        }).then(function(){
                            newLibrariansCount++;

                            if(newLibrariansCount===librarians.length && (!library.librarians || librariansUpdatedCount===library.librarians.length)) {
                                deferred.resolve();
                            }
                            
                        }, function(err) {
                            deferred.reject(err);
                        });
                    }, function(err) {
                        console.log('rejected');
                        console.log(err);

                        deferred.reject(err);
                    });
                });

                // Link the library to the librarians' profiles
                for (var id in library.librarians) {

                    var user = UserResource.get({id: library.librarians[id]._id});

                    user.ownLibraryID = libraryID;
                    
                    var updatedUser = new UsersResource(user);
                    updatedUser._id = library.librarians[id]._id;
                    updatedUser.$update().then(function(){
                        librariansUpdatedCount++;

                        if((!librarians || newLibrariansCount===librarians.length) && librariansUpdatedCount===library.librarians.length) {
                            deferred.resolve();
                        }

                    }, function(reason) {
                        deferred.reject(reason);
                    });

                }
                library._id = libraryID;

            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    };
});
