'use strict';

app.controller('ProfileCtrl', function($scope, identity) {
    $scope.user = identity.currentUser;
});
