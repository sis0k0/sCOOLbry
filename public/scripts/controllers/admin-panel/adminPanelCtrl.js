'use strict';

app.controller('AdminPanelCtrl', function($scope, $location, $http, identity) {
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
                'browse' : '/admin/books'
            }
        },

        {
            'name' : 'users',
            links : {
                'add' : '/admin/users/add',
                'browse' : '/admin/users'
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
    $http.get('/api/library/late-readings').success(function(){
        console.log('fined');
    }).error(function(data){
        console.log('error: '+data);

    });

});
