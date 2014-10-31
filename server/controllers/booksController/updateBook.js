'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	if (req.user.roles.indexOf('admin') > -1) {
		var updatedBookData = req.body;
		var updatedId = req.body._id;
		delete updatedBookData._id;
		
		Book.update({_id: updatedId}, updatedBookData, function(err) {
			console.log(err);
			res.end();
		});
	}
	else {
		res.send({reason: 'You do not have permissions!'});
	}
};