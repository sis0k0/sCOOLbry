app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth, $window) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/');
            }
            else {
				
				notifier.error('Username/Password combination is not valid or the RECAPTCHA Challenge is not complete!');
				
				
				$window.Recaptcha.reload();
            }
        });
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }

    $scope.width = angular.element($window).width();
    if($scope.width<700) {
        $scope.dataToggle = "collapse";
        $scope.dataTarget = ".navbar-inverse-collapse";
    }
    else{
        $scope.dataToggle = "";
        $scope.dataTarget = "";    
    }
    
    $scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
       console.log(value);
   });

    $scope.showWidth = function() {
        var width = angular.element($window).width();
        if(width>700)
            return 
    }
});
