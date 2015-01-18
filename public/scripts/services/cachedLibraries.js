'use strict';

app.factory('cachedLibraries', function(LibraryResource, $q) {
    var cachedLibraries;

    return {
        query: function() {
            var deferred = $q.defer();

            if (!cachedLibraries) {
                cachedLibraries = LibraryResource.query(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(cachedLibraries);
            }

            return deferred.promise;

        }
    };
});
