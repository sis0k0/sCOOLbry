'use strict';

var	User = require('mongoose').model('User');

module.exports = function(req, res) {
	User.remove({_id: req.params.id}, function(err) {
		if (err) {
				res.send('false');
		}else{
				res.send('true');
				
		}
	});
};