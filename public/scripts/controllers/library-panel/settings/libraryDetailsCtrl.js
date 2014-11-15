'use strict';

app.controller('LibraryDetailsCtrl', function($scope, LibraryResource, $routeParams, $http, identity, Library, $location) {
	
    $scope.user = identity.currentUser;
	$scope.library = LibraryResource.get({
		id: $scope.user.ownLibraryID
	}, function(library) {
		//library.monday = true; TODO set monday, tuesday + hours to values
        
        if(library.workHoursOpeningHour==undefined) {
            library.workHoursOpeningHour = new Array(7);
        }

        if(library.workHoursClosingHour==undefined) {
            library.workHoursClosingHour = new Array(7);
        }


        if(library.workHoursOpeningMinutes==undefined) {
            library.workHoursOpeningMinutes = new Array(7);
        }

        if(library.workHoursClosingMinutes==undefined) {
            library.workHoursClosingMinutes = new Array(7);
        }

        var openingTime, closingTime, times;

        for(var i = 0; i < 7; i++) {

            if(library.workdays[i]==true && library.workdays[i]!=undefined) {
                
                times = library.workhours[i].split("-");
                
                openingTime = times[0];
                closingTime = times[1];

                openingTime = openingTime.split(":");
                closingTime = closingTime.split(":");

                library.workHoursOpeningHour[i]    = openingTime[0];
                library.workHoursOpeningMinutes[i] = openingTime[1];
                library.workHoursClosingHour[i]    = closingTime[0];
                library.workHoursClosingMinutes[i] = closingTime[1];
            
            }else{

                library.workdays[i] = false;

            }

        }


	});

	
	$scope.updateLibrary = function(library) {
        var workdays = new Array();
        var workhours = new Array();
        var workhoursString = ''; 
        
        for(var i = 0; i < 7; i++) {            
            if(library.workdays[i]==true) {
                workdays[i] = true;
                workhoursString = library.workHoursOpeningHour[i]+':'+library.workHoursOpeningMinutes[i]+'-'+library.workHoursClosingHour[i]+':'+library.workHoursClosingMinutes[i];
                workhours[i] = workhoursString;
            }

        }

        delete library.workdays;
        delete library.workhours;
        library.workdays = workdays;
        library.workhours = workhours;
        console.log(library);
        Library.updateLibrary(library).then(function() {
            $location.path('/libraryPanel');

        });
    };

    $scope.get24hours = function(){
    	var a = new Array(24);
    	console.log(a);

    	return a;
    };
});
