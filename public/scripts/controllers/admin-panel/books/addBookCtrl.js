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


	// Define schema's fields

	$scope.fields = new Array();

	$scope.fields.push('isbn');
	$scope.fields.push('title');
	$scope.fields.push('author');
	$scope.fields.push('description');
	$scope.fields.push('publisher');
	$scope.fields.push('cover');
	$scope.fields.push('authorNationality');
	$scope.fields.push('language');
	$scope.fields.push('pages');
	$scope.fields.push('themes');
	$scope.fields.push('genres');
	$scope.fields.push('edition');
	$scope.fields.push('illustrated');
	$scope.fields.push('published');

	console.log($scope.fields);

	$scope.columns = new Array();

	function displayColumns() {
		console.log($scope.columns);
	}

	// Add book

    $scope.addBook = function(book) {
        Book.add(book).then(function() {
            $window.location.href = '/admin/books';
            notifier.success('Book added successfully!');
        }, function(reason){
                notifier.error(reason);
            });
    };

    $scope.newForm = function() {
    	$scope.books = new Array();
 		$scope.books[0] = new Object({});
 		$scope.displayForm = true;
    }

    $scope.findBook = function() {

    	$scope.searchState = true;
    	var bookPromise = bookSearch.search($scope.ISBNSearch);
    	bookPromise.then(function success(data) {
            console.log(data);
    		$scope.books = new Array();
    		$scope.books[0] = data;
            $scope.books[0].isbn = $scope.ISBNSearch.replace(/-/gi, '');
            $scope.displayForm = true;
    	}, function error(msg) {
            $scope.searchState = false;
    		console.log('not found');
    	});
    }

    $scope.setFileEventListener = function(element) {
        if($scope.books==undefined) {
            $scope.books[0] = new Object({});
        }
        $scope.uploadedFile = element.files[0];

        if ($scope.uploadedFile) {
            $scope.$apply(function() {
                $scope.uploadButtonState = true;
            });
        }
    };

    $scope.uploadFile = function(index) {
        if (!$scope.uploadedFile) {
            return;
        }

        ajaxPost.uploadFileInit($scope.uploadedFile)
            .then(function(result) {
                if (result.status === 200) {
                    $scope.books[index].cover = result.data;
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
