'use strict';

app.controller('LibraryAddBookCtrl', function($scope, $http, $location, $anchorScroll, $filter, Book, bookSearch, identity, notifier, ajaxPost, LibBookResource, LibraryResource) {

    $scope.displayForm = false;
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
    $scope.library = LibraryResource.get({id: identity.currentUser.ownLibraryID}, function(data) {
        console.log(data);
    });

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

    for(var i = 0; i < 10; i++){
        $scope.fields.push(fieldsOptions);
    }

    $scope.updateSelections = function(key, value) {
        $scope.matches[key] = value;
        for(var i = 0; i < Object.keys($scope.csv.result[0]).length; i++) {
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


    // Link the imported csv/xlsx tables
    $scope.showCSVForms = function(includeTopRow, sheet) {
        $scope.books = []; // Define the books array

        var len = (sheet && $scope.csv.result.sheets[sheet].data.length) || $scope.csv.result.length; // Inizialize the books length - sheet data length or result length (excel or csv)
        for(var i = (includeTopRow) ? 0 : 1; i<len; i++) {

            var book = {}; // Define new book object
            for(var j=0; j<fieldsOptions.length; j++) {
                if(typeof($scope.matches[j]) !== 'undefined') { // If the field is specified
                    book[$scope.matches[j]] = sheet ? $scope.csv.result.sheets[sheet].data[i][j] : $scope.csv.result[i][j]; // Assign new property to the book
                }
            }
            $scope.books.push(book); // Push the book object to the books array in the scope
        }

        $scope.displayForm = true;
        $anchorScroll();
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
        book.available = book.total;
        Book.add(book, identity.currentUser.ownLibraryID).then(function() {
            notifier.success('Book added successfully!');

            if(typeof $scope.books !== 'undefined') {
                $scope.books.splice(index,1);
            }
            if(typeof $scope.book !== 'undefined' || $scope.books.length<1) {
                $location.path('/library-panel/books-library');
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
        $scope.existInLibrary = undefined;

        angular.element('#searchByIsbnButton').trigger('click');

        var bookPromise = bookSearch.search($scope.ISBNSearch);
        bookPromise.then(function success(data) {

            if(data.foundInDatabase) {

                LibBookResource.get({bookID: data._id, libraryID: $scope.library._id}, function(book) {

                    $scope.existInLibrary = true;
                    $scope.libBook = book;

                    angular.element('#searchByIsbn').select();
                    $scope.found = false;
                    $scope.searchState = false;
                }, function(err){
                    if(err.status===404) {
                        $scope.book = data;
                    } else {
                        notifier.error(err.data);
                    }
                });


            } else {

                $scope.books = [];
                data.isbn = $scope.ISBNSearch.replace(/-/gi, '');

                if((typeof data.themes !== 'undefined') && (typeof $scope.library.librarySections !== 'undefined')) {

                    console.log(data.themes);

                    data.themes.forEach(function(theme) {
                        if($scope.library.librarySections.sectionsTheme.indexOf(theme)>-1) {
                            data.section = $scope.library.librarySections.sectionsTheme.indexOf(theme)+1;
                        }

                    });
                }


                $scope.books[0] = data;
                $scope.displayForm = true;
                $scope.searchState = true;
            }

        }, function error() {
            angular.element('#searchByIsbn').select();
            $scope.searchState = false;
            $scope.found = false;
        });
    };

    $scope.setFileEventListener = function(element) {
        if(typeof $scope.books=== 'undefined') {
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
