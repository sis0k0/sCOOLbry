app.controller('SignUpCtrl', function($scope, $location, auth, notifier, $http) {
    $scope.signup = function(user) {
		
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    },
    $scope.check= function(){
		
		if($scope.user.username.length<3 || $scope.user.email.legth<3){
			
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
				
		}
		
		var responsePromise = $http.get("/api/usernameTaken/"+$scope.user.username);
		//TODO: add pretty errors
		responsePromise.success(function(data, status, headers, config) {
			if(data=="true"){
				
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
			}else{
				$scope.signUpForm.$valid = true;
				$scope.signUpForm.$invalid = false;
			}
		});
           
           
        var responsePromise = $http.get("/api/emailTaken/"+$scope.user.email);
		//TODO: add pretty errors
		responsePromise.success(function(data, status, headers, config) {
			if(data=="true"){
				
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
			}else{
				$scope.signUpForm.$valid = true;
				$scope.signUpForm.$invalid = false;
			}
		});
                
    }
});
