'use strict';

app.controller('AdvancedSearchCtrl', function($scope, $http) {
    $scope.text = undefined;
    $scope.fileread = undefined;
    $scope.uploadError = undefined;
    $scope.loading = 0;

    $scope.findBookByText = function() {
        $scope.loading++;
        $scope.uploadError = undefined;
        $http.post('/api/books/full-text', {text: $scope.citation}).
            success(function(books) {
                console.log(books);
                if(books.length) {
                    $scope.text = books;
                } else {
                    $scope.uploadError = 'No books found!';
                }
            }).
            error(function(err) {
                $scope.uploadError = err.reason || err;
                console.log($scope.uploadError);
            }).
            finally(function() {
                $scope.loading--;
            });
    };


    // $scope.text = [{
    //     description: 'and the provision made to meet every possible <em>accident</em> that one of these great ships is perhaps most remarkable. <em>All</em> the machinery which may be set in motion in <em>case</em> of danger is <em>centered</em> on the hridge and so perfectly has it <em>been</em> arranged that the entire vessel could be controlled, if the necessity',
    //     title: 'For young folks',
    //     author: 'St Nicolas',
    //     publisher: 'I dunno',
    //     _id: '55436c39bd786c90206d0081',
    //     cover: 'http://www.stnicholascenter.org/media/images/s/st-nicholas-1905.jpg'
    // },{
    //     description: 'and the provision made to meet every possible <em>accident</em> that one of these great ships is perhaps most remarkable. <em>All</em> the machinery which may be set in motion in <em>case</em> of danger is <em>centered</em> on the hridge and so perfectly has it <em>been</em> arranged that the entire vessel could be controlled, if the necessity',
    //     title: 'For young folks',
    //     author: 'St Nicolas',
    //     publisher: 'I dunno',
    //     _id: '55436c39bd786c90206d0081',
    //     cover: 'http://www.stnicholascenter.org/media/images/s/st-nicholas-1905.jpg'
    // }];

});
