'use strict';

app.controller('LibraryFinesListCtrl', function($scope, $routeParams, $http, identity, LibFinesResourceSortable) {
    $scope.user = identity.currentUser;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = 'added';
    $scope.order = 'asc';
    
    $scope.range = function(n) {
        return new Array(n);
    };
    
    $scope.pages = function(){
        $http.get('/api/finesInLibraryCount/'+$scope.user.ownLibraryID).success(function(data){
            console.log(data);
            $scope.finesCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.finesCount/$scope.perPage);
        });
    };
    
    $scope.fines = LibFinesResourceSortable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage,
            libraryID: $scope.user.ownLibraryID
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
    
    $scope.reloadFines = function(){
        $scope.fines = LibFinesResourceSortable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage,
            libraryID: $scope.user.ownLibraryID
        });
    };

});