app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        roles: identity.currentUser.roles,
        avatar: identity.currentUser.avatar,
        fb_url: identity.currentUser.fb_url,
        twitter_url: identity.currentUser.twitter_url,
        googleplus_url: identity.currentUser.googleplus_url,
        favourite_book: identity.currentUser.favourite_book,
        about_us: identity.currentUser.about_us
    }

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.roles = user.roles;
            $scope.avatar = user.avatar;
            $scope.fb_url = user.fb_url;
            $scope.twitter_url = user.twitter_url;
            $scope.googleplus_url = user.googleplus_url;
            $scope.favourite_book = user.favourite_book;
            $scope.about_us = user.about_us;
        
            $location.path('/');
        });
    }
});
