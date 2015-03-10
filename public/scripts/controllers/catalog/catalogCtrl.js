'use strict';

app.controller('CatalogCtrl', function($scope, BookResourceSortable, BookResourceFilterable, $routeParams, $http) {
    

    // Get genres
    $http({
        method: 'get',
        url: '/api/genres'
    }).success(function(data) {
        $scope.genres = data;
    }).error(function(err) {
        console.log(err);
    });
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = 'uploaded';
    $scope.order = 'desc';
    $scope.criteria = 'all';
    $scope.phrase = ' ';
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){  
        if($scope.phrase===' '){
            $http.get('/api/book/count').success(function(data){
                $scope.booksCount = parseInt(data);
                $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
                console.log(data);
                console.log($scope.pagesCount);
            });
        }else{
            $http.get('/api/book/countFilter/'+$scope.field+'/'+$scope.order+'/'+$scope.page+'/'+$scope.perPage+'/'+$scope.criteria+'/'+$scope.phrase).success(function(data){
                $scope.booksCount = parseInt(data);
                $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
                console.log(data);
                console.log($scope.pagesCount);
            });
        }
    };

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
        if($scope.phrase==='') $scope.phrase = ' ';
        $scope.books = BookResourceFilterable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage,
            criteria: $scope.criteria,
            phrase: $scope.phrase
        }, function() {
            console.log($scope.books);
        });
    };
    
    
    $scope.books = BookResourceFilterable.query({
        field: $scope.field,
        order: $scope.order,
        page: $scope.page,
        perPage: $scope.perPage,
        criteria: $scope.criteria,
        phrase: $scope.phrase

    }, function() {
        console.log($scope.books);
    });


});