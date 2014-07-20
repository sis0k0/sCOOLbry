app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        email: identity.currentUser.email,
        roles: identity.currentUser.roles,
        avatar: identity.currentUser.avatar,
        facebookUrl: identity.currentUser.facebookUrl,
        twitterUrl: identity.currentUser.twitterUrl,
        googlePlusUrl: identity.currentUser.googlePlusUrl,
        aboutMe: identity.currentUser.aboutMe
    }
});
