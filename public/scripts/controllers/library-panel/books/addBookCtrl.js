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
        cache: true,
        url: '/api/genres'
    }).success(function(data) {
        $scope.genres = data;
    }).error(function(err) {
        console.log(err);
    });

    // Upload ebook
    $scope.uploadEbook = function(index) {
        var fd = new FormData();
        //Take the first selected file
        fd.append('file', $scope.uploadedFile);

        $http.post('/api/books/upload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function success(data) {
            $scope.books[index].ebookUrl = data;
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
    // Set pagination

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.field = '_id';
    $scope.library = LibraryResource.get({id: identity.currentUser.ownLibraryID});

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

    // Get book schema fields
    $http({
        method: 'get',
        cache: true,
        url: '/api/books/fields/true'
    }).success(function(data) {
        fieldsOptions = data;
        fieldsOptionsCopy = fieldsOptions;
        for(var i = 0; i < 20; i++){
            $scope.fields.push(fieldsOptions);
        }
    }).error(function(err) {
        console.log(err);
    });

    $scope.updateSelections = function(key, value) {
        value = (value.toString()==='quantity') ? 'total' : value;
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

        var results = sheet ? $scope.result.sheets[sheet].data[0] : $scope.result[0];
        var matches = {};

        for(var i=0; i<$scope.matches.length; i++) {
            if(typeof $scope.matches[i] !== 'undefined') {
                matches[$scope.matches[i]] = results[i];
            }
        }
        matches = JSON.stringify(matches);
        var fd = new FormData();
        //Take the first selected file
        fd.append('file', $scope.file);
        fd.append('matches', matches);
        fd.append('topRow', includeTopRow);
        fd.append('sheet', sheet);

        $scope.loading = true;
        $http.post('/api/library/books/import/'+$scope.library._id, fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function success(data) {
            console.log(data);
            notifier.success('All books were added successfully');
            $location.path('/library-panel/books-library');
        }).error(function error(error) {
            console.log(error);
            if(error.reason) {
                notifier.error(error.reason);
            }

            if(error.failed || error.isbnExists) {
                $scope.books       = error.failed;
                $scope.isbnExists  = error.isbnExists;
                $scope.displayForm = true;

                notifier.error('Some books were not added. Please check all fields');
                $anchorScroll();
            }
        }).finally(function() {
            $scope.loading = false;
        });
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

        console.log('add book ctrl');
        Book.add(book, identity.currentUser.ownLibraryID).then(function() {
            console.log('success');
            notifier.success('Book added successfully!');
            if(typeof $scope.books !== 'undefined') {
                $scope.books.splice(index,1);
            }
            if(typeof $scope.book !== 'undefined' || $scope.books.length<1) {
                $location.path('/library-panel/books-library');
            }

        }, function(reason){
            console.log('fail');
            console.log(reason);
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

            console.log(data);

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
