app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = identity.currentUser;
});
