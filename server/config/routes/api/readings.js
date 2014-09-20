'use strict';

//var auth = require('../../auth'),
var	controllers = require('../../../controllers'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {

	// Libraries
	router.get('/all-readings', controllers.readings.getAllReadings);
	router.get('/all-readings/:id', controllers.readings.getAllReadingsUser);
	
	app.use('/api/', router);
};
