'use strict';

var paypal = require('paypal-rest-sdk');
var LibFines = require('mongoose').model('LibFines');
var LibUser = require('mongoose').model('LibUser');


module.exports = function(req, res) {
    var paymentId = req.session.paymentId;
    var paymentType = req.session.paymentType;


	var payerId = req.param('PayerID');

	var details = { 'payer_id': payerId };
	paypal.payment.execute(paymentId, details, function (error) {
		if (error) {
			console.log(error);
			res.send(error);
			res.end();
		} else {
			if(paymentType==='fine') {
    			var now = new Date();

        	var paidObject = {
          		paid: now
        	};
        
          LibFines.update({paymentId: paymentId}, paidObject, {runValidators: true}, function(err) {
              console.log(err);
              res.end();
          });


      }else if(paymentType==='subscription'){
          var now = new Date();

          var paidObject = {
              lastPaid: now,
              active: true
          };
          
          console.log(paymentId);
          console.log(paidObject);
          LibUser.update({paymentId: paymentId}, paidObject, {runValidators: true}, function(err) {
              console.log(err);
              res.end();
          });
      }
    	
      res.writeHead(302, {
          'Location': '/thank-you'
      });
      
      res.end();
		}
	});

};