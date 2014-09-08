'use strict';

app.controller('UserInfoCtrl', function($scope, UserResource, $routeParams) {
    $scope.userInfo = UserResource.get({id: $routeParams.id}, function(data){
	
		if(data.dateOfBirth===undefined){
			data.dateOfBirth = 'N/A';
		}
	
		if(data.facebookUrl===undefined){
			data.facebookUrl = 'N/A';
		}
	
		if(data.twitterUrl===undefined){
			data.twitterUrl = 'N/A';
		}
	
		if(data.googlePlusUrl===undefined){
			data.googlePlusUrl = 'N/A';
		}
	
		if(data.aboutMe===undefined){
			data.aboutMe = 'N/A';
		}

	});
    
   
});
