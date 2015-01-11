'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
	console.log('inside remove');
	Booking.remove({_id: req.params.id}, function(err) {
		if (err) {
			res.status(503).send('Cannot connect to database');
		}else{
			res.send('true');
		}
	});
};