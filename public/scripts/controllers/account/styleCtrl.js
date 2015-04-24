'use strict';

app.controller('StyleCtrl', function($scope, identity) {
    if(typeof(identity.currentUser) === 'undefined') {
        $scope.style = 'flatly';
    }else{
        $scope.style = identity.currentUser.style;
    }
});