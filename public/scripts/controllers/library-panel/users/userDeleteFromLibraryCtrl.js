'use strict';

app.controller('UserDeleteFromLibraryCtrl', function($scope, $routeParams, $http, $location, notifier, identity) {
    
    $http.get('/api/library/delete-user/' + $routeParams.id + '/' + identity.currentUser.ownLibraryID).success(function(){
		notifier.success('The user has been successfully unsubscribed from the library.');
	});
	$location.path('/library-panel/users');

});
