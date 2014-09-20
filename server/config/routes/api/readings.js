'use strict';

//var auth = require('../../auth'),
var	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {

	// Libraries
	router.get('/all-readings', controllers.readings.getAllReadings);
	router.get('/all-readings/:id', controllers.readings.getAllReadingsUser);
	router.get('/all-readings/:libraryID/:userID', controllers.readings.getAllReadingsInLibraryForUser);
	
	app.use('/api/', router);
};
