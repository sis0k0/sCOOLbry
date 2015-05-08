'use strict';

app.directive('getBookExisting', function ($http, LibBookResource, notifier) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {

            scope.$watch(attrs.ngShow, function(newValue) {

                if(newValue === true) {

                    var findInDatabasePromise = $http.get('/api/book/findByISBN/' + attrs.isbn);
                    findInDatabasePromise.success(function(data) {

                        LibBookResource.get({bookID: data._id, libraryID: scope.library._id}, function() {
                            scope.foundBookId = data._id;
                        }, function(err){
                            if(err.status===404) {
                                scope.book = data;
                                scope.book.foundInDatabase = true;
                                scope.bookForm.isbn.$setValidity('available', true);
                            } else {
                                notifier.error(err.data);
                            }
                        });

                    });
                }

            });
        }
    };
});
