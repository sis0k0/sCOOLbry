'use strict';

var	User = require('mongoose').model('User');

module.exports = function(req, res) {
	User.findOne({email: req.params.email}).exec(function(err, user) {
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