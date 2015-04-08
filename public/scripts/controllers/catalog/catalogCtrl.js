'use strict';

app.controller('CatalogCtrl', function($scope, BookResourceFilterable, $routeParams, $http) {
    
    // Defaults
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = 'uploaded';
    $scope.order = 'desc';
    $scope.criteria = 'all';
    $scope.phrase = ' ';

    $scope.libraryID = $routeParams.id || 'all';

    // Load books
    $scope.books = BookResourceFilterable.query({libraryID: $scope.libraryID});

    // Get range for books to be shown
    $scope.range = function(n) {
        return new Array(n);
    };

    /// Get pages count
    $scope.pages = function(){
        if($scope.phrase===' '){
            var url = $routeParams.id ? '/api/book/count/'+$routeParams.id : '/api/book/count';
            $http.get(url).success(function(data){
                $scope.booksCount = parseInt(data);
                $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
            });
        }else{
            $http.get('/api/book/countFilter/'+$scope.field+'/'+$scope.order+'/'+$scope.page+'/'+$scope.perPage+'/'+$scope.criteria+'/'+$scope.phrase+'/'+$scope.libraryID).success(function(data){
                $scope.booksCount = parseInt(data);
                $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
            });
        }
    };

    $scope.pages();

    // Change page, according to user interaction
    $scope.setPage = function(page, event){
        var newPage = page || '1';

        if(newPage!==$scope.page) {
            $scope.page = page || '1';
            angular.element('.pagination li').removeClass('active');

            var target = event ? '#' + event.target.id : '#page-1';
            angular.element(target).parent().addClass('active');
        }

    };
    
    // Sort by field    
    $scope.sort = function(event){
        $scope.field = event.target.id;
        $scope.order = ($scope.order==='asc') ? $scope.order='desc' : $scope.order='asc';
    };
    
    // Reload query
    $scope.reloadBooks = function(){
        if($scope.phrase==='') {
            $scope.phrase = ' ';
        }

        $scope.books = BookResourceFilterable.query({
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage,
            criteria: $scope.criteria,
            phrase: $scope.phrase,
            libraryID: $scope.libraryID
        });
    };
    

});