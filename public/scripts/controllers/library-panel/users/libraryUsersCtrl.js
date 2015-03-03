'use strict';

app.controller('LibraryUsersCtrl', function($scope, LibraryUsersResourceSortable, $routeParams, $http, identity) {
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = '_id';
    $scope.order = 'asc';
    $scope.user = identity.currentUser;
    
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){
        $http.get('/api/library/user-count').success(function(data){
            $scope.usersCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.usersCount/$scope.perPage);
            
        });
    };
    
    $scope.users = LibraryUsersResourceSortable.query({
        id: $scope.user.ownLibraryID,
        field: $scope.field,
        order: $scope.order,
        page: $scope.page,
        perPage: $scope.perPage
    });
    
    $scope.setPage = function(page, event){
        
        $scope.page = page;
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
        $scope.users = LibraryUsersResourceSortable.query({
            id: $scope.user.ownLibraryID,
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
        });
        
    };
});
