'use strict';

var	User = require('mongoose').model('User');

module.exports = function(req, res) {
	User.findOne({username: req.params.username}).exec(function(err, user) {
		if (err) {
			res.send(false);
		}else{
			if(user===null){
				res.send(false);
			}else{
				res.send(true);
			}
			
		}
	});
};