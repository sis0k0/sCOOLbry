'use strict';

app.directive('getBookLink', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {

            scope.$watch(attrs.ngShow, function(newValue) {

                if(newValue === true) {

                    var findInDatabasePromise = $http.get('/api/book/findByISBN/' + attrs.isbn);
                    findInDatabasePromise.success(function(data) {
                        scope.foundBookId = data._id;
                    });
                }

            });
        }
    };
});
