app.controller('SignUpCtrl', function($scope, $location, auth, notifier, $http, $window) {
    $scope.signup = function(user) {
		
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function(reason){
			notifier.error(reason);
			$window.Recaptcha.reload();
			
		})
    },
    $scope.check= function(user){
		
		if($scope.user.username==undefined ||  $scope.user.email==undefined){
			
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
				return ;
				
		}else if($scope.user.username!=undefined){
				
				if($scope.user.username.length<3){
				
					$scope.signUpForm.$valid = false;
					$scope.signUpForm.$invalid = true;
					return ;
				}
				
		}else if($scope.user.email!=undefined){
				
				if($scope.user.email.length<3){
				
					$scope.signUpForm.$valid = false;
					$scope.signUpForm.$invalid = true;
					return ;
				}
				
		}
		
		var responsePromise = $http.get("/api/usernameTaken/"+$scope.user.username);
		var invalid = false;
		//TODO: add pretty errors
		responsePromise.success(function(data, status, headers, config) {
			if(data=="true"){		
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
				invalid = true;
			}else{
				$scope.signUpForm.$valid = true;
				$scope.signUpForm.$invalid = false;
				invalid = false;
			}
		});
		
		var responsePromise = $http.get("/api/emailTaken/"+$scope.user.email);
		//TODO: add pretty errors
		responsePromise.success(function(data, status, headers, config) {
			if(data=="true" || invalid==true){
				$scope.signUpForm.$valid = false;
				$scope.signUpForm.$invalid = true;
			}else{
				$scope.signUpForm.$valid = true;
				$scope.signUpForm.$invalid = false;
			}
		});
		
    }
});
