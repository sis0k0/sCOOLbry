'use strict';

app.factory('cachedBooks', function(BookResource, $q) {
    var cachedBooks;

    return {
        query: function() {
            var deferred = $q.defer();
            if (!cachedBooks) {
                cachedBooks = BookResource.query(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(cachedBooks);
            }

            return deferred.promise;
        }
    };
});
