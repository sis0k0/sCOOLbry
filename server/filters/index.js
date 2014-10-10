'use strict';

var rolesFilter = require('../filters/usersRoles'),
	genresFilter = require('../filters/genres'),
	countriesFilter = require('../filters/countries');

module.exports = {
    roles: rolesFilter,
    genres: genresFilter,
    countries: countriesFilter
};
