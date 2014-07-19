app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        roles: identity.currentUser.roles,
        avatar: identity.currentUser.avatar
    }

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.roles = user.roles;
            $scope.avatar = user.avatar;
            $location.path('/');
        });
    }
});