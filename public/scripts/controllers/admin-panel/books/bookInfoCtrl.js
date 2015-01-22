'use strict';

app.controller('BookInfoCtrl', function($scope, BookResource, $routeParams) {

    $scope.showMore = true;

    $scope.book = BookResource.get({id: $routeParams.id});

    console.log($scope.book);
   
});
