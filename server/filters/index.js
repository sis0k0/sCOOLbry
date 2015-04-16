'use strict';

var rolesFilter     = require('../filters/usersRoles'),
    genresFilter    = require('../filters/genres'),
    countriesFilter = require('../filters/countries'),
    currencyFilter  = require('../filters/currency');

module.exports = {
    roles: rolesFilter,
    genres: genresFilter,
    countries: countriesFilter,
    currency: currencyFilter
};