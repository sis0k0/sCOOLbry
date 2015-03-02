'use strict';

app.directive('checkAvailability', function ($http) {
    return {
        restrict: 'A',
        scope: {
            currentValue: '=checkAvailability',
            field: '=ngModel'
        },
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {

            scope.$watch('field', function(value) {
                console.log(value);
                console.log(scope.currentValue);

                // if the new value differs from the current one (the one before the modification)
                if(value!==scope.currentValue) {

                    // check whether available
                    var responsePromise = $http.get('/api/' + attrs.name + 'Available/' + value);
                    responsePromise.success(function(data) {
                        if(data===true){
                            ngModel.$setValidity('available', false);
                        }else{
                            ngModel.$setValidity('available', true);
                        }
                    }); 
                } else {
                    ngModel.$setValidity('available', true);
                }
            });
        }
    };
});
