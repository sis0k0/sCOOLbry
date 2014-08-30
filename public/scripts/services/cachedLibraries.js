'use strict';

app.factory('cachedLibraries', function(LibraryResource) {
    var cachedLibraries;

    return {
        query: function() {
            if (!cachedLibraries) {
                cachedLibraries = LibraryResource.query();
            }

            return cachedLibraries;
        }
    };
});
