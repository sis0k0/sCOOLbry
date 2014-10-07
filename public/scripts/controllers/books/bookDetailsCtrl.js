'use strict';

app.controller('BookDetailsCtrl', function($scope, $routeParams, identity, $http, auth, notifier, $location, BookResource) {
    $scope.bookInfo = BookResource.get({id: $routeParams.id});
});
