'use strict';

app.controller('UserListCtrl', function($scope, UsersResourceSortable, $routeParams, $http) {
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = '_id';
    $scope.order = 'asc';
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){
        $http.get('/api/users/count').success(function(data){
            $scope.usersCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.usersCount/$scope.perPage);
            
        });
    };
    
    
    $scope.users = UsersResourceSortable.query({
        field: $scope.field,
        order: $scope.order,
        page: $scope.page,
        perPage: $scope.perPage
    });
    
    
    $scope.setPage = function(page, event){
        
        $scope.page = page;
        console.log(page);
        angular.element('.pagination li').removeClass('active');
        angular.element('#'+event.target.id).parent().addClass('active');
    };
    
    $scope.setPerPage = function(perPage){
        $scope.perPage = perPage;
    };
    
    
    $scope.sort = function(event){
        $scope.field = event.target.id;
        $scope.order = ($scope.order==='asc') ? $scope.order='desc' : $scope.order='asc';
    };
    
    $scope.reloadUsers = function(){
        $scope.users = UsersResourceSortable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
        });
        
    };
});
