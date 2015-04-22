'use strict';

var paypal = require('paypal-rest-sdk');
var LibFines = require('mongoose').model('LibFines');
var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {
    var method = req.param('method');

    var paymentType = req.param('type');

    var itemID = req.param('itemID');

    var description = '';

    if(paymentType==='fine') {
        description = 'Fine '+itemID;
    }else{
        description = 'Subscription '+itemID;
    }

    var payment = {
        'intent': 'sale',
        'payer': {
        },
        'transactions': [{
            'amount': {
                'currency': req.param('currency'),
                'total': req.param('amount')
            },
            'description': description
        }]
    };
/*jshint camelcase: false */
    if (method === 'paypal') {
        payment.payer.payment_method = 'paypal';
        payment.redirect_urls = {
            'return_url': 'http://www.scoolbry.com/api/payment/execute/',
            'cancel_url': 'http://www.scoolbry.com/'
        };
    }
    /* else if (method === 'credit_card') {
        var funding_instruments = [
            {
                'credit_card': {
                    'type': req.param('type').toLowerCase(),
                    'number': req.param('number'),
                    'expire_month': req.param('expire_month'),
                    'expire_year': req.param('expire_year'),
                    'first_name': req.param('first_name'),
                    'last_name': req.param('last_name')
                }
            }
        ];
        payment.payer.payment_method = 'credit_card';
        payment.payer.funding_instruments = funding_instruments;
    } */

/*jshint camelcase: true */
    paypal.payment.create(payment, function (error, payment) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            req.session.paymentId = payment.id;
            if(paymentType==='fine') {
                req.session.paymentType = 'fine';
                var paymentObject = {
                    paymentId: payment.id
                };
        
                LibFines.update({_id: itemID}, paymentObject, {runValidators: true}, function(err) {
                    console.log(err);
                    res.end();
                });

            }else{
                req.session.paymentType = 'subscription';
                 var paymentObject = {
                    paymentId: payment.id,
                    active: false
                };

                LibUser.update({_id: itemID}, paymentObject, {runValidators: true}, function(err) {
                    console.log(err);
                    res.end();
                });


            }

            res.writeHead(302, {
              'Location': payment.links[1].href
              //add other headers here...
            });
            res.end();

        }
    });

};