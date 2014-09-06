'use strict';

var rolesFilter = require('../filters/usersRoles'),
	genresFilter = require('../filters/genres');

module.exports = {
    roles: rolesFilter,
    genres: genresFilter
};
