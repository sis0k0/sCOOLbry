'use strict';

app.controller('SearchCtrl', function($scope, $location, $routeParams, BookSearchResource) {
    
    $scope.search = function(phrase) {
        if(typeof phrase === 'undefined' || phrase===' ') {
            $scope.results = undefined;
        }else{
            $scope.phrase = phrase;
            $scope.results = BookSearchResource.query({phrase: phrase, limit: 4});
        }
    };

    $scope.searchDetails = function(phrase) {
        $location.path('/search/'+phrase);
    };

    if($routeParams.phrase!==undefined) {
        $scope.phrase = $routeParams.phrase;
        $scope.books = BookSearchResource.query({phrase: $routeParams.phrase, limit: 10});

        console.log($scope.books);
    }
});
