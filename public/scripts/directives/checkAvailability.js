'use strict';

app.directive('checkAvailability', function ($http) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var counter = 0, 
                defaultValue;

            scope.$watch(attrs.ngModel, function(value, oldValue) {
                if(value!==oldValue && value!==defaultValue) {
                    if(counter===0) {
                        defaultValue = oldValue;
                        counter++;
                    }

                    var responsePromise = $http.get('/api/' + attrs.name + 'Available/' + value);
                    responsePromise.success(function(data) {
                        console.log(data);
                        if(data===true){
                            ctrl.$setValidity('taken', false);
                        }else{
                            ctrl.$setValidity('taken', true);
                        }
                    }); 
                }
            });
        }
    };
});
