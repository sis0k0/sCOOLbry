'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
	Book.remove({_id: req.params.id}, function(err) {
		if (err) {
				res.send('false');
		}else{
				res.send('true');
				
		}
	});
};