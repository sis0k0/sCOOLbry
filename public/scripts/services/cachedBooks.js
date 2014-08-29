app.factory('cachedBooks', function(BookResource) {
    var cachedBooks;

    return {
        query: function() {
            if (!cachedBooks) {
                cachedBooks = BookResource.query();
            }

            return cachedBooks;
        }
    }
});
