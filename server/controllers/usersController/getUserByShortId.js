'use strict';

var	User = require('mongoose').model('User');

module.exports = function(req, res) {
	User.findOne({id: req.params.id}).exec(function(err, user) {
		if (err) {
			res.send('User cannot be found');
			
		}else{
			res.send(user);
		}
	});
};