'use strict';

app.controller('BooksTakenCtrl', function($scope, ReadingResourceSortable, $routeParams, $http, identity) {
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = '_id';
    $scope.order = 'asc';
    $scope.user = identity.currentUser;
    
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){
        $http.get('/api/library/reading-count/'+$scope.user.ownLibraryID).success(function(data){
            console.log(data);
            $scope.usersCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.usersCount/$scope.perPage);
            
        });
    };
    console.log($scope.user.ownLibraryID);
    $scope.readings = ReadingResourceSortable.query({
        libraryID: $scope.user.ownLibraryID,
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
    
    $scope.reloadBookings = function(){
        $scope.readings = ReadingResourceSortable.query({
            libraryID: $scope.user.ownLibraryID,
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
        });
        
    };
});
