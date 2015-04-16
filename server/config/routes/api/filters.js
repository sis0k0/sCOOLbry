'use strict';

var    filters = require('../../../filters'),
    express = require('express'),
    router  = express.Router();

module.exports = function(app) {

    // Users roles
    router.get('/roles', filters.roles.getAllRoles);

    // Genres
    router.get('/genres', filters.genres.getAllGenres);

    // Countries
    router.get('/countries', filters.countries.getAllCountries);

    // Currency
    router.get('/currency', filters.currency.getAllCurrency);

    app.use('/api/', router);
};
