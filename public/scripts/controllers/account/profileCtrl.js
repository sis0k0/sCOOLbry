'use strict';

account.controller('ProfileCtrl', function($scope, identity) {
    $scope.user = identity.currentUser;
});
