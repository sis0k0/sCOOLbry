'use strict';

app.controller('AddBookCtrl', function($scope, $window, $http, Book, bookSearch, notifier, ajaxPost) {

    $scope.displayForm = false;

	$http({
		method: 'get',
		url: '/api/genres'
	}).success(function(data) {
		$scope.genres = data;
	}).error(function(err) {
		console.log(err);
	});

    $scope.addBook = function(book) {
        Book.add(book).then(function() {
            $window.location.href = '/admin/books';
            notifier.success('Book added successfully!');
        }, function(reason){
                notifier.error(reason);
            });
    };

    $scope.findBook = function() {

    	var bookPromise = bookSearch.search($scope.ISBNSearch);
    	bookPromise.then(function success(data) {
            console.log(data);
    		$scope.book = data;
            $scope.book.isbn = $scope.ISBNSearch.replace(/-/gi, '');
            $scope.displayForm = true;
    	}, function error(msg) {
            $scope.searchState = false;
    		console.log('not found');
    	});
    }

    $scope.setFileEventListener = function(element) {
        if($scope.book==undefined) {
            $scope.book = new Object({});
        }
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
