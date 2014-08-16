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

    $scope.checkIfTaken = function(field){
	    var responsePromise = $http.get("../api/" + field.$name + "Taken/" + field.$viewValue);
	    responsePromise.success(function(data, status, headers, config) {
            if(data=="true"){
                field.$setValidity("taken", false);
            }else{
                field.$setValidity("taken", true);
            }
	    });             
    }

    $scope.passwordMatch = function (password, confirmPassword) {
    	if(password.$viewValue !== confirmPassword.$viewValue){
    		confirmPassword.$setValidity("notMatching", false);
    	}else{
    		confirmPassword.$setValidity("notMatching", true);
    	}
	}

});