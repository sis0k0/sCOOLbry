'use strict';

app.controller('SearchCtrl', function($scope, $location, $routeParams, BookSearchResource) {
    
    $scope.search = function(phrase) {
        $location.path('/search/'+phrase);
    };

    $scope.phrase = $routeParams.phrase;
    $scope.books = BookSearchResource.query({phrase: $routeParams.phrase});

    console.log($scope.books);
});
