'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {
		
	LibUser.remove({userID: req.params.id, libraryID: req.params.libraryID}, function(err) {
		if (err) {
			console.log(err);
				res.send('false');
		}else{
				res.send('true');
				
		}
	});
};