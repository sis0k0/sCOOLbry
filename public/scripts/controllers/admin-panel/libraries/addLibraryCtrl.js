'use strict';

app.controller('AddLibraryCtrl', function($scope, $http, $window, auth, notifier, UserResource) {

	$http({
		method: 'get',
		url: '/api/countries'
	}).success(function(data) {
		$scope.countries = data;
		//console.log($scope.countries);
	}).error(function(err) {
		console.log(err);
	});

	$http({
		method: 'get',
		url: '/api/users'
	}).success(function(data) {
		$scope.users = data;
		//console.log($scope.users);
	}).error(function(err) {
		console.log(err);
	});


    $scope.addLibrary = function(library) {

		// for (var librarian in library.librarians) {
		// 	// var user = UserResourse.get({id: librarian});
		// 	// auth.updateAsAdmin(user);
		// 	console.log(library.librarians[librarian]);
		// }
        var newLibraryID = auth.addLibrary(library);
        console.log('controller' + ' --> ' + newLibraryID);


   		for (var userID in library.librarians) {
    		var user = UserResource.get({id: library.librarians[userID]});
    		user.ownLibraryID = newLibraryID;
    		console.log(user);
    		auth.updateAsAdmin(user);
		}


            //$window.location.href = '/admin/libraries';
        notifier.success('Library added successfully!');

        // }, function(reason){
        //         notifier.error(reason);
        //     });
    };


});
