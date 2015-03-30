'use strict';

app.controller('AddBookCtrl', function($scope, $window, $http, $anchorScroll, $filter, $location, Book, bookSearch, notifier, ajaxPost) {

    $scope.today = new Date();

    // Handle error function
    var handleError = function(reason) {
        console.log(reason);
        if(reason instanceof Object) {
            notifier.error($filter('titleCase')(reason.data.reason.name));
            $scope.mongooseErrors = reason.data.reason.errors;
        } else {
            notifier.error(reason);
        }
    };

    // Get genres
    $http({
        method: 'get',
        url: '/api/genres'
    }).success(function(data) {
        $scope.genres = data;
    }).error(function(err) {
        console.log(err);
    });

    // Set pagination

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.field = '_id';
    
    $scope.range = function(n) {
        return new Array(n);
    };

    $scope.getPagesCount = function(){
        $scope.booksCount = $scope.books.length;
        $scope.pagesCount = Math.ceil($scope.booksCount/$scope.perPage);
        return $scope.pagesCount;
    };

    $scope.setPage = function(page, event){
        
        $scope.page = page;

        $anchorScroll();

        angular.element('.pagination li').removeClass('active');
        angular.element('#'+event.target.id).parent().addClass('active');
    };
    
    $scope.setPerPage = function(perPage){
        $scope.perPage = perPage;
    };


    // Define schema's fields

    var fieldsOptions = [], fieldsOptionsCopy = [];
    $scope.fields = [];
    $scope.matches = [];
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

    for(var i = 0; i < 20; i++){
        $scope.fields.push(fieldsOptions);
    }

    $scope.updateSelections = function(key, value) {
        $scope.matches[key] = value;
        for(var i = 0; i < Object.keys($scope.result[0]).length; i++) {
            $scope.fields[i] = [];
            for(var j = 0; j < fieldsOptionsCopy.length; j++){
                if($scope.matches.indexOf(fieldsOptionsCopy[j])<0) {
                    $scope.fields[i].push(fieldsOptionsCopy[j]);
                }
            }
        }

        $scope.matches.forEach(function(element, index) {
            $scope.fields[index].push(element);
        });

    };

    // Link the imported csv/xlsx/xls tables
    $scope.showCSVForms = function(includeTopRow, sheet, notDisplayingForm) {
        $scope.books = []; // Define the books array

        var len = (sheet && $scope.result.sheets[sheet].data.length) || $scope.result.length; // Inizialize the books length - sheet data length or result length (excel or csv)
        for(var i = (includeTopRow) ? 0 : 1; i<len; i++) {

            var book = {}; // Define new book object
            for(var j=0; j<fieldsOptions.length; j++) {
                if(typeof($scope.matches[j]) !== 'undefined') { // If the field is specified
                    book[$scope.matches[j]] = sheet ? $scope.result.sheets[sheet].data[i][j] : $scope.result[i][j]; // Assign new property to the book
                }
            }
            $scope.books.push(book); // Push the book object to the books array in the scope
        }

        if(!notDisplayingForm) {
            $scope.displayForm = true;
            $anchorScroll();
        }
    };

    // Import all books from csv/xls/xlsx at once
    $scope.importAll = function(includeTopRow, sheet) {
        $scope.showCSVForms(includeTopRow, sheet, true); // Match table data with scoolbry database fields

        var counter = 0,
            booksCount = $scope.books.length;

        // Add book, keep index to remove the book from the books array if added successfully
        function addBookFunc(index) {
            Book.add($scope.books[index]).then(function() {
                $scope.books.splice(index,1);
                bookResponse();
            }, function() {
                bookResponse();
            });
        }

        // Increment counter manually, because the requests are async
        function bookResponse() {
            counter++;
            if(counter===booksCount) { // If all books are iterated
                if($scope.books.length>0) { // If there are still books in the books array
                    // Display error message and show to forms to the user
                    notifier.error('Some books couldn\'t be added! Please check all the required fields!');
                    $scope.displayForm = true;
                    $anchorScroll();
                } else { // If there are no books in the array
                    // Show success message and redirect to library books
                    notifier.success('Books added successfully!');
                    $location.path('/library-panel/books-library');
                }
            }
        }

        // Iterate through the books
        for(var book in $scope.books) {
            addBookFunc(book);
        }
    };

    // Remove book form
    $scope.removeBookForm = function(index) {
        $scope.books.splice(index,1);
        notifier.success('Book Form removed successfully!');
        if($scope.books.length<1) {
            $scope.displayForm = false;
            $scope.csv = false;
            $scope.searchState = undefined;
        }
    };

    // Add book
    $scope.addBook = function(book, index) {
        Book.add(book).then(function() {
            notifier.success('Book added successfully!');
            $scope.books.splice(index,1);
            if($scope.books.length<1) {
                $window.location.href = '/admin/books';
            }

        }, function(reason){
            handleError(reason);
        });
    };

    $scope.newForm = function() {
        $scope.books = [];
         $scope.books[0] = new Object({});
         $scope.displayForm = true;
        $scope.searchState = undefined;
    };

    $scope.findBook = function() {

        $scope.searchState = undefined;
        $scope.found = undefined;
        angular.element('#searchByIsbnButton').trigger('click');

        var bookPromise = bookSearch.search($scope.ISBNSearch);
        bookPromise.then(function success(data) {
            if(data.foundInDatabase===true) {
                $scope.searchState = false;
                $scope.bookURL = '/admin/book/' + data._id;
            } else {
                $scope.books = [];
                data.isbn = $scope.ISBNSearch.replace(/-/gi, '');
                $scope.books[0] = data;
                $scope.displayForm = true;
                $scope.searchState = true;
            }
        }, function error() {
            $scope.searchState = false;
            $scope.found = false;
            angular.element('#searchByIsbn').select();
        });
    };

    // Upload certificate
    $scope.displayForm = false;

    $scope.setFileEventListener = function(element) {
        if(typeof $scope.books === 'undefined') {
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
