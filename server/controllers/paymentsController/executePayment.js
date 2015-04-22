'use strict';

var paypal = require('paypal-rest-sdk');
var LibFines = require('mongoose').model('LibFines');


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

       		}
    		res.writeHead(302, {
              'Location': '../profile'
              //add other headers here...
            });
            res.end();
		}
	});

};