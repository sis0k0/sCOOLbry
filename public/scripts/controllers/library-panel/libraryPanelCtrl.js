'use strict';

app.controller('LibraryPanelCtrl', function($scope, identity, $location) {
    $scope.identity = identity;
    $scope.path = $location.path();

    $scope.menu = [

        {
            'name' : 'books',
            links : {
                'add' : '/library-panel/books/add',
                'browse' : '/library-panel/books-library',
                'search' : '/library-panel/books/search-library'
            }
        },

        {
            'name' : 'users',
            links : {
                'add' : '/library-panel/users/add',
                'browse' : '/library-panel/users',
                'search' : '/library-panel/users/search',
                'book requests' : '/library-panel/users/book-requests'
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
