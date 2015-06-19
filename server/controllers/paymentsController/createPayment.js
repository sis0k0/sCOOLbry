'use strict';

var paypal   = require('paypal-rest-sdk'),
    LibFines = require('mongoose').model('LibFines'),
    LibUser  = require('mongoose').model('LibUser'),
    errors   = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var method = req.param('method'),
        paymentType = req.param('type'),
        itemID = req.param('itemID'),
        description = '';

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
            // Production
            //'return_url': 'http://www.scoolbry.com/api/payment/execute/',
            //'cancel_url': 'http://www.scoolbry.com/'

            // Development
              'return_url': 'http://127.0.0.1:3030/api/payment/execute/',
              'cancel_url': 'http://127.0.0.1:3030/'

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
    paypal.payment.create(payment, function (err, payment) {
        if (err) {
            return next(new errors.DatabaseError(err, 'PayPal Payment'));
        } else {
            req.session.paymentId = payment.id;
            if(paymentType==='fine') {
                req.session.paymentType = 'fine';
                var paymentObject = {
                    paymentId: payment.id
                };
        
                LibFines.update({_id: itemID}, paymentObject, {runValidators: true}, function(err) {
                    return next(new errors.DatabaseError(err, 'Library Fines'));
                });

            }else{
                req.session.paymentType = 'subscription';
                 var paymentObject = {
                    paymentId: payment.id,
                    active: false
                };

                LibUser.update({_id: itemID}, paymentObject, {runValidators: true}, function(err) {
                    return next(new errors.DatabaseError(err, 'Library User'));
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