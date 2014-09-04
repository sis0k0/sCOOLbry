'use strict';

var usersRoles = [
	'standart',
	'moderator',
	'admin',
	'libraryOwner',
	'librarian'
	];


module.exports = {
    getAllRoles: function(req, res) {
		res.send(usersRoles);
	}
};