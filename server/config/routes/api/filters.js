'use strict';

var	filters = require('../../../filters'),
	express = require('express'),
	router = express.Router();

module.exports = function(app) {



	// Users roles
	router.get('/roles', filters.roles.getAllRoles);

    // Genres
	router.get('/genres', filters.genres.getAllGenres);


	router.get('/*', function(req, res) {
		res.status(404);
		res.end();
	});

	app.use('/api/', router);
};