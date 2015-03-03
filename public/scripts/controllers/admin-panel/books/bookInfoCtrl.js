'use strict';

app.controller('BookInfoCtrl', function($scope, BookResource, $routeParams, $location) {

    $scope.showMore = true;

    $scope.book = BookResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        }
    }, function() {
        $location.path('/404');
    });

});
