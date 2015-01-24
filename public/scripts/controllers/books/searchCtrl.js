'use strict';

app.controller('SearchCtrl', function($scope, $location, $routeParams, $http, BookSearchResource) {
    
    $scope.showResults = false;

    $scope.search = function(phrase) {
        if(typeof phrase === 'undefined' || phrase===' ' || phrase==='') {
            $scope.results = undefined;
            $scope.showResults = false;
        }else{
            $scope.phrase = phrase;
            return BookSearchResource.query({phrase: phrase, limit: 4}, function(results) {
                $scope.results = results;

                if($scope.results.length===0){
                    $scope.showResults = false;

                }else{
                    $scope.showResults = true;
                    var lastResult = {
                        message: 'See more results for \'' + phrase + '\''
                    };
                    $scope.results.push(lastResult);
                }
            });
        }
    };

    $scope.goToResult = function(item) {
        $scope.result.selected = undefined;
        if(item.hasOwnProperty('message')) {
            $location.path('/search/' + $scope.phrase);
        } else {
            $location.path('/book/' + item._id);
        }
    };

    if($routeParams.phrase!==undefined) {
        $scope.phrase = $routeParams.phrase;
        $scope.books = BookSearchResource.query({phrase: $routeParams.phrase, limit: 10});
    }

    $scope.hideResults = function() {
        $scope.results = undefined;
    };


});
