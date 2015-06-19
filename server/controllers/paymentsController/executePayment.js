'use strict';

var paypal = require('paypal-rest-sdk'),
    LibFines = require('mongoose').model('LibFines'),
    LibUser = require('mongoose').model('LibUser'),
    errors  = require('../../utilities/httpErrors');


module.exports = function(req, res, next) {

    var paymentId = req.session.paymentId,
        paymentType = req.session.paymentType,
        payerId = req.param('PayerID'),
        details = { 'payer_id': payerId };

    paypal.payment.execute(paymentId, details, function (err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'PayPal Payment'));
        } else {
            if(paymentType==='fine') {
                var now = new Date();

            var paidObject = {
                paid: now
            };
        
          LibFines.update({paymentId: paymentId}, paidObject, {runValidators: true}, function(err) {
                return next(new errors.DatabaseError(err, 'Library Fines'));
          });


      }else if(paymentType==='subscription'){
          var now = new Date();

          var paidObject = {
              lastPaid: now,
              active: true
          };
          
            LibUser.update({paymentId: paymentId}, paidObject, {runValidators: true}, function(err) {
                return next(new errors.DatabaseError(err, 'Library User'));
            });
      }
        
      res.writeHead(302, {
          'Location': '/thank-you'
      });
      
      res.end();
        }
    });

};