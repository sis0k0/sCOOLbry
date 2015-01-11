'use strict';

app.controller('AdminPanelCtrl', function($scope, $location, identity) {
    $scope.identity = identity;
    $scope.path = $location.path();

    $scope.menu = [
        {
            'name' : 'libraries',
            links : {
                'add' : '/admin/libraries/add',
                'browse' : '/admin/libraries',
                'queue' : '/admin/libraries/queue'
            }
        },

        {
            'name' : 'books',
            links : {
                'add' : '/admin/books/add',
                'browse' : '/admin/books',
                'search' : '/admin/books/search-library'
            }
        },

        {
            'name' : 'users',
            links : {
                'add' : '/admin/users/add',
                'browse' : '/admin/users',
                'search' : '/admin/users/search'
            }
        }
    ];

    // Gets the current menu item
    // using the current location path
    $scope.getCurrentMenuItem = function(path) {
        for(var i=0; i<$scope.menu.length; i++) {
            for (var key in $scope.menu[i].links) {
                if($scope.menu[i].links[key]===path){
                    return $scope.menu[i].name;
                }
            }
        }
        return '';
    };

    $scope.currentMenuItem = $scope.getCurrentMenuItem($scope.path);
});
