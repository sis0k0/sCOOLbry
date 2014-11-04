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

    $scope.includeTopRow = false;

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

    for(var i = 0; i < 10; i++){
        $scope.fields.push(fieldsOptions);
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

        //console.log($scope.matches);

        //console.log($scope.fields);
    }

    $scope.showCSVForms = function() {
        $scope.books = new Array();
        var b=-1;

        var i;
        console.log($scope.includeTopRow);
        if($scope.includeTopRow===true) {
            i=0;
        } else {
            i=1;
        }

        for(i; i<$scope.csv.result.length; i++) {

            b++;
            $scope.books[b] = new Object({});

            for(var j=0; j<$scope.csv.result[i].length; j++) {
                if(typeof($scope.matches[j]) !== 'undefined') {
                    $scope.books[b][$scope.matches[j]] = $scope.csv.result[i][j];
                }
            }
        }
        $scope.displayForm = true;
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
    	var bookPromise = bookSearch.search($scope.ISBNSearch);
    	bookPromise.then(function success(data) {
    		$scope.books = new Array();
            data.isbn = $scope.ISBNSearch.replace(/-/gi, '');
    		$scope.books[0] = data;
            $scope.displayForm = true;
            $scope.searchState = true;
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
