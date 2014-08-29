app.controller('BooksListCtrl', function($scope, cachedBooks) {
    $scope.books = cachedBooks.query();
});
