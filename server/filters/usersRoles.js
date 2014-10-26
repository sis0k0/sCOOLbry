'use strict';

var usersRoles = [
	'admin',
	'moderator',
	'libraryOwner',
	'librarian',
	'standart'
	];


module.exports = {
	getAllRoles: function(req, res) {
		res.send(usersRoles);
	}
};