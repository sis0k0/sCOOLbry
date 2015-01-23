'use strict';

app.controller('SearchCtrl', function($scope, $location, $routeParams, BookSearchResource) {
    
    $scope.showResults = false;

    $scope.search = function(phrase) {
        console.log(phrase);
        if(typeof phrase === 'undefined' || phrase===' ' || phrase==='') {
            $scope.results = undefined;
            $scope.showResults = false;
        }else{
            $scope.phrase = phrase;
            $scope.results = BookSearchResource.query({phrase: phrase, limit: 4});
            console.log($scope.results.length);
            if($scope.results.length===0){
                $scope.showResults = false;
            }else{
                $scope.showResults = true;
            }
        }
    };

    $scope.searchDetails = function(phrase) {
        $location.path('/search/'+phrase);
    };

    if($routeParams.phrase!==undefined) {
        $scope.phrase = $routeParams.phrase;
        $scope.books = BookSearchResource.query({phrase: $routeParams.phrase, limit: 10});
    }

    $scope.hideResults = function() {
        $scope.results = undefined;
    };


});
