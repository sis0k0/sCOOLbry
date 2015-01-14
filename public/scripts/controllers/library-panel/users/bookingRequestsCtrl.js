'use strict';

app.controller('BookingRequestsCtrl', function($scope, BookingResourceSortable, $routeParams, $http, identity, UserResource, BookResource) {
    
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = '_id';
    $scope.order = 'asc';
    $scope.user = identity.currentUser;
    
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

    $scope.pages = function(){
        $http.get('/api/library/booking-count/'+$scope.user.ownLibraryID).success(function(data){
            console.log(data);
            $scope.usersCount = parseInt(data);
            $scope.pagesCount = Math.ceil($scope.usersCount/$scope.perPage);
            
        });
    };
    
    $scope.bookings = BookingResourceSortable.query({
            libraryID: $scope.user.ownLibraryID,
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
    }, function(data) {

        for(var i=0; i<data.length; i++) {
            $scope.bookings[i].bookDate = new Date(Date.parse($scope.bookings[i].bookDate)).toUTCString();
            $scope.bookings[i].user = UserResource.get({id: data[i].userID});
            $scope.bookings[i].book = BookResource.get({id: data[i].bookID});
        }

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
        $scope.bookings = BookingResourceSortable.query({
            libraryID: $scope.user.ownLibraryID,
            field: $scope.field,
            order: $scope.order,
            page: $scope.page,
            perPage: $scope.perPage
        }, function(data) {
            for(var i=0; i<data.length; i++) {
                $scope.bookings[i].bookDate = new Date(Date.parse($scope.bookings[i].bookDate)).toUTCString();
                $scope.bookings[i].user = UserResource.get({id: data[i].userID});
                $scope.bookings[i].book = BookResource.get({id: data[i].bookID});
            }
        });
        
    };
});
