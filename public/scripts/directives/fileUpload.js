'use strict';

app.directive('fileupload', function ($http) {
    return {
        scope: {
            fileread: '=',
            text: '=',
            uploadError: '=',
            loading: '='
        },
        link: function (scope, element) {
            console.log('inside');
            scope.loading = 0;
            scope.uploadError = undefined;
            element.bind('change', function (changeEvent) {
                console.log('change');
                scope.$apply(function () {
                    scope.fileupload = changeEvent.target.files[0];
                });
                var fd = new FormData();
                //Take the first selected file
                fd.append('file', changeEvent.target.files[0]);

                scope.uploadError = undefined;
                scope.text = undefined;
                scope.loading++;

                $http.post('/api/image/text', fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(function success(data) {
                    console.log(data);

                    $http.post('/api/books/full-text', {text: data}).
                        success(function(books) {
                            console.log(books);
                            if(books.length) {
                                scope.text = books;
                            } else {
                                scope.uploadError = 'No books found!';
                            }
                        }).
                        error(function(err) {
                            console.log(err);
                            scope.uploadError = err.reason || err;
                        }).
                        finally(function() {
                            scope.loading--;
                        });



                }).error(function error(error) {
                    console.log(error);
                    scope.uploadError = error && error.reason && error.reason.name;
                    scope.loading--;
                });
            });
        }
    };
});
