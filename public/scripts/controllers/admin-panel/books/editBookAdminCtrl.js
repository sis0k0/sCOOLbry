'use strict';

app.controller('EditBookAdminCtrl', function($scope, $location, $http, $filter, Book, ajaxPost, BookResource, notifier, $routeParams) {

    $scope.today = new Date();

    // Handle error function
    var handleError = function(reason) {
        if(reason instanceof Object) {
            notifier.error($filter('titleCase')(reason.data.reason.name));
            $scope.mongooseErrors = reason.data.reason.errors;
        } else {
            notifier.error(reason);
        }
    };

    // Get the book
    $scope.book = BookResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        }
    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });

    // Get book genres
    $http({
        method: 'get',
        cache: true,
        url: '/api/genres'
    }).success(function(data) {
        $scope.genres = data;
    }).error(function(err) {
        console.log(err);
    });

    // Upload ebook
    $scope.uploadEbook = function() {
        var fd = new FormData();
        //Take the first selected file
        fd.append('file', $scope.uploadedFile);

        $http.post('/api/books/upload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function success(data) {
            $scope.book.ebookUrl = data;
            $scope.ebookUploadSuccess = 'Ebook successfully uploaded';
            $scope.ebookUploadError = undefined;
            console.log(data);

        }).error(function error(error) {
            if(error.reason) {
                console.log(error);
                $scope.ebookUploadError = error.reason.name || error.reason;
                $scope.ebookUploadSuccess = undefined;
            }
        });
    };

    // Update the book
    $scope.update = function(book) {
        Book.update(book).then(function() {
            notifier.success('Book updated successfully!');
            $location.path('/admin/books');
        }, function(reason) {
            console.log(reason);
            handleError(reason);
        });
    };

    // Uploading sertificate

    $scope.uploadButtonState = false;
    $scope.setFileEventListener = function(element) {
        $scope.uploadedFile = element.files[0];

        if ($scope.uploadedFile) {
            $scope.$apply(function() {
                $scope.uploadButtonState = true;
            });
        }
    };

    $scope.uploadFile = function() {
        if (!$scope.uploadedFile) {
            return;
        }

        ajaxPost.uploadFileInit($scope.uploadedFile)
            .then(function(result) {
                if (result.status === 200) {
                    $scope.book.cover = result.data;
                    $scope.coverUploadSuccessful = true;
                    $scope.coverUploadError = false;
                    $scope.coverTypeError = false;   
                }
            }, function(error) {
                if(error.data==='Invalid mime type'){
                    $scope.coverTypeError = true;
                }
                else{
                    $scope.coverUploadError = true;
                }
                $scope.coverError = error.data;
            });           
    };

});