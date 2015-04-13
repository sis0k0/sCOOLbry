'use strict';

app.controller('RegisterLibraryCtrl', function($scope, $http, $location, $window, $anchorScroll, $filter, Library, User, notifier, UserResource, ajaxPost) {

    // Define library and default working hours
    $scope.library = new Object({});
    $scope.library.workdays = [];
    $scope.library.workHoursOpeningHour = [];
    $scope.library.workHoursClosingHour = [];
    $scope.library.workHoursOpeningMinutes = [];
    $scope.library.workHoursClosingMinutes = [];

    for(var i=0; i<7; i++) {
        $scope.library.workdays[i] = true;
        $scope.library.workHoursOpeningHour[i] = 10;
        $scope.library.workHoursClosingHour[i] = 18;
        $scope.library.workHoursOpeningMinutes[i] = 0;
        $scope.library.workHoursClosingMinutes[i] = 0;
    }

    $scope.refreshAddresses = function(address) {
        var params = {address: address, sensor: false};
        return $http.get(
            'http://maps.googleapis.com/maps/api/geocode/json',
            {params: params}
        ).then(function(response) {
            console.log(response);
            $scope.addresses = response.data.results;
        });
    };

    // Add library
    $scope.addLibrary = function() {

        var workdays = [];
        var workhours = [];
        var workhoursString = ''; 
        
        for(var i = 0; i < 7; i++) {            
            if($scope.library.workdays[i]===true) {
                workdays[i] = true;
                workhoursString = $scope.library.workHoursOpeningHour[i]+':'+$scope.library.workHoursOpeningMinutes[i]+'-'+$scope.library.workHoursClosingHour[i]+':'+$scope.library.workHoursClosingMinutes[i];
                workhours[i] = workhoursString;
            }

        }

        delete $scope.library.workdays;
        delete $scope.library.workhours;
        $scope.library.workdays = workdays;
        $scope.library.workhours = workhours;

        Library.registerLibrary($scope.library, $scope.librarians[0]).then(function(){
            notifier.success('Library added successfully!');
            $location.path('/library-panel');
            $anchorScroll();
        }, function(reason){
            if(!(reason instanceof Object)) {
                notifier.error(reason);
            } else {


                $scope.mongooseErrors = reason.errors || [reason];
                console.log($scope.mongooseErrors);

                notifier.error($filter('titleCase')(reason.name));
            }
            $window.Recaptcha.reload();

        });
    };

    // Get list of all countries to choose from for library's location
    $http({
        method: 'get',
        cache: true,
        url: '/api/countries'
    }).success(function(data) {
        $scope.countries = data;
    }).error(function(err) {
        console.log(err);
    });

    // For certificate uploading

    $scope.setFileEventListener = function(element) {
        $scope.uploadedFile = element.files[0];
        
        if(typeof $scope.library === 'undefined') {
            $scope.library = new Object({});
        }
        
        $scope.library.active = true;
        if ($scope.uploadedFile) {
            $scope.$apply(function() {
                $scope.uploadButtonState = true;
            });   
        }
    };

    $scope.uploadFile = function() {

        console.log('upload file');
        if (!$scope.uploadedFile) {
            return;
        }

        ajaxPost.uploadFileInit($scope.uploadedFile)
            .then(function(result) {
                if (result.status === 200) {
                    $scope.library.certificate = result.data;
                    $scope.certificateUploadSuccessful = true;
                    $scope.certificateUploadError = false;
                    $scope.certificateTypeError = false;  
                    $scope.uploadButtonState = true;
                    $scope.uploadedFile = true;
                    
                }
            }, function(error) {
                console.log(error);
                if(error.data==='Invalid mime type'){
                    $scope.certificateTypeError = true;
                }
                else{
                    $scope.certificateUploadError = true;
                }
                $scope.certificateError = error.data;
            });
    };

    // Librarians
    
    $scope.librariansCount = 1;

    $scope.librarians = [];
    
    for(var i = 0; i < $scope.librariansCount; i++) {
        $scope.librarians[i] = new Object({'index': i});
        $scope.librarians[i].roles = ['libraryOwner', 'standart'];
    }
});
