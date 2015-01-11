'use strict';

app.controller('BookListCtrl', function($scope, BookResourceSortable, $routeParams, $http) {
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = 'uploaded';
    $scope.order = 'desc';
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){
        $http.get('/api/book/count').success(function(data){
            $scope.booksCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
        });
    };
    
    
    $scope.books = BookResourceSortable.query({
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
    
    $scope.reloadBooks = function(){
        $scope.books = BookResourceSortable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
        });
    };

});
