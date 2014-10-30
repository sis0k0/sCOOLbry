'use strict';

app.controller('LibraryDetailsCtrl', function($scope, LibraryResource, $routeParams, $http, identity, Library, $location) {
	
    $scope.user = identity.currentUser;
	$scope.library = LibraryResource.get({
		id: $scope.user.ownLibraryID
	}, function(library) {
		//library.monday = true; TODO set monday, tuesday + hours to values
        console.log(library);
        var openingTime, closingTime, times;
        if(library.workdays.indexOf(1)>=0) {
            library.monday = true;
            times = library.workhours[library.workdays.indexOf(1)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursMondayOpeningHour = openingTime[0];
            library.workHoursMondayOpeningMinutes = openingTime[1];
            library.workHoursMondayClosingHour = closingTime[0];
            library.workHoursMondayClosingMinutes = closingTime[1];
        }else{
            library.monday = false;
        }


        if(library.workdays.indexOf(2)>=0) {
            library.tuesday = true;

            times = library.workhours[library.workdays.indexOf(2)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursTuesdayOpeningHour = openingTime[0];
            library.workHoursTuesdayOpeningMinutes = openingTime[1];
            library.workHoursTuesdayClosingHour = closingTime[0];
            library.workHoursTuesdayClosingMinutes = closingTime[1];
        }else{
            library.tuesday = false;
        }


        if(library.workdays.indexOf(3)>=0) {
            library.wednesday = true;
            times = library.workhours[library.workdays.indexOf(3)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursWednesdayOpeningHour = openingTime[0];
            library.workHoursWednesdayOpeningMinutes = openingTime[1];
            library.workHoursWednesdayClosingHour = closingTime[0];
            library.workHoursWednesdayClosingMinutes = closingTime[1];
        }else{
            library.wednesday = false;
        }


        if(library.workdays.indexOf(4)>=0) {
            library.thursday = true;
            times = library.workhours[library.workdays.indexOf(2)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursThursdayOpeningHour = openingTime[0];
            library.workHoursThursdayOpeningMinutes = openingTime[1];
            library.workHoursThursdayClosingHour = closingTime[0];
            library.workHoursThursdayClosingMinutes = closingTime[1];
        
        }else{
            library.thursday = false;
        }


        if(library.workdays.indexOf(5)>=0) {
            library.friday = true;
            times = library.workhours[library.workdays.indexOf(2)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursFridayOpeningHour = openingTime[0];
            library.workHoursFridayOpeningMinutes = openingTime[1];
            library.workHoursFridayClosingHour = closingTime[0];
            library.workHoursFridayClosingMinutes = closingTime[1];
        }else{
            library.friday = false;
        }


        if(library.workdays.indexOf(6)>=0) {
            library.saturday = true;
            times = library.workhours[library.workdays.indexOf(2)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursSaturdayOpeningHour = openingTime[0];
            library.workHoursSaturdayOpeningMinutes = openingTime[1];
            library.workHoursSaturdayClosingHour = closingTime[0];
            library.workHoursSaturdayClosingMinutes = closingTime[1];
        
        }else{
            library.saturday = false;
        }


        if(library.workdays.indexOf(0)>=0) {
            library.sunday = true;
            times = library.workhours[library.workdays.indexOf(2)].split("-");
            openingTime = times[0];
            closingTime = times[1];
            openingTime = openingTime.split(":");
            closingTime = closingTime.split(":");
            library.workHoursSundayOpeningHour = openingTime[0];
            library.workHoursSundayOpeningMinutes = openingTime[1];
            library.workHoursSundayClosingHour = closingTime[0];
            library.workHoursSundayClosingMinutes = closingTime[1];
        
        }else{
            library.sunday = false;
        }


	});

	
	$scope.updateLibrary = function(library) {
        var workdays = new Array();
        var workhours = new Array();
        var workhoursString = ''; 
            
        if(library.monday==true) {
            workdays.push(1);
            workhoursString = library.workHoursMondayOpeningHour+':'+library.workHoursMondayOpeningMinutes+'-'+library.workHoursMondayClosingHour+':'+library.workHoursMondayClosingMinutes;
            workhours.push(workhoursString);
        }

        if(library.tuesday==true) {
            workdays.push(2);
            workhoursString = library.workHoursTuesdayOpeningHour+':'+library.workHoursTuesdayOpeningMinutes+'-'+library.workHoursTuesdayClosingHour+':'+library.workHoursTuesdayClosingMinutes;
            workhours.push(workhoursString);
        }
                    
        if(library.wednesday==true) {
            workdays.push(3);
            workhoursString = library.workHoursWednesdayOpeningHour+':'+library.workHoursWednesdayOpeningMinutes+'-'+library.workHoursWednesdayClosingHour+':'+library.workHoursWednesdayClosingMinutes;
            workhours.push(workhoursString);
        }
            
        if(library.thursday==true) {
            workdays.push(4);
            workhoursString = library.workHoursThursdayOpeningHour+':'+library.workHoursThursdayOpeningMinutes+'-'+library.workHoursThursdayClosingHour+':'+library.workHoursThursdayClosingMinutes;
            workhours.push(workhoursString);
        }
            
        if(library.friday==true) {
            workdays.push(5);
            workhoursString = library.workHoursFridayOpeningHour+':'+library.workHoursFridayOpeningMinutes+'-'+library.workHoursFridayClosingHour+':'+library.workHoursFridayClosingMinutes;
            workhours.push(workhoursString);
        }

        if(library.saturday==true) {
            workdays.push(6);
            workhoursString = library.workHoursSaturdayOpeningHour+':'+library.workHoursSaturdayOpeningMinutes+'-'+library.workHoursSaturdayClosingHour+':'+library.workHoursSaturdayClosingMinutes;
            workhours.push(workhoursString);
        }

        if(library.sunday==true) {
            workdays.push(0);
            workhoursString = library.workHoursSundayOpeningHour+':'+library.workHoursSundayOpeningMinutes+'-'+library.workHoursSundayClosingHour+':'+library.workHoursSundayClosingMinutes;
            workhours.push(workhoursString);
        }
        delete library.workdays;
        delete library.workhours;
        library.workdays = workdays;
        library.workhours = workhours;
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
