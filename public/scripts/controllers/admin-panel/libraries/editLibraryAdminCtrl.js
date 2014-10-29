'use strict';

app.controller('editLibraryAdminCtrl', function($scope, $location, Library, ajaxPost, LibraryResource, $routeParams) {

    $scope.library = LibraryResource.get({id: $routeParams.id});
	
	$scope.updateLibrary = function(library) {
        Library.updateLibrary(library).then(function() {
            $location.path('/admin/libraries');
        });
    };

});
