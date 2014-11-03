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

	var fieldsOptions = new Array(), fieldsOptionsCopy = new Array();
    $scope.fields = new Array();
    $scope.matches = new Array();
	fieldsOptions.push('isbn');
	fieldsOptions.push('title');
	fieldsOptions.push('author');
	fieldsOptions.push('description');
	fieldsOptions.push('publisher');
	fieldsOptions.push('cover');
	fieldsOptions.push('authorNationality');
	fieldsOptions.push('language');
	fieldsOptions.push('pages');
	fieldsOptions.push('themes');
	fieldsOptions.push('genres');
	fieldsOptions.push('edition');
	fieldsOptions.push('illustrated');
	fieldsOptions.push('published');
    fieldsOptionsCopy = fieldsOptions;

    console.log(fieldsOptions);
    for(var i = 0; i < 10; i++){
        $scope.fields.push(fieldsOptions);
    }


	$scope.displayColumns = function() {
		var results = $scope.csv.result[0];

		for(var i=0; i<results.length; i++) {
			console.log(results[i]);
		}

		for(var i=0; i<$scope.csv.result[0]; i++) {
			console.log($scope.csv.result[0][i])
		}

	}

    $scope.updateSelections = function(key, value) {
        $scope.matches[key] = value;
        for(var i = 0; i < Object.keys($scope.csv.result[0]).length; i++) {
            $scope.fields[i] = [];
            for(var j = 0; j < fieldsOptionsCopy.length; j++){
                if(!($scope.matches.indexOf(fieldsOptionsCopy[j])>=0)) {
                    $scope.fields[i].push(fieldsOptionsCopy[j]);
                }
            }
        }

        $scope.matches.forEach(function(element, index) {
            $scope.fields[index].push(element);
        });

        console.log($scope.fields);
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
