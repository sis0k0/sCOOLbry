'use strict';

app.controller('EditBookAdminCtrl', function($scope, $location, $http, Book, ajaxPost, BookResource, notifier, $routeParams) {

    $scope.today = new Date();

    // Get the book
    $scope.book = BookResource.get({id: $routeParams.id});

    // Get book genres
    $http({
        method: 'get',
        url: '/api/genres'
    }).success(function(data) {
        $scope.genres = data;
    }).error(function(err) {
        console.log(err);
    });

    // Update the book
    $scope.update = function(book) {
        Book.update(book).then(function() {
            notifier.success('Book updated successfully!');
            $location.path('/admin/books');
        }, function(err) {
            notifier.error(err);
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