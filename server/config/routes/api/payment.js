'use strict';

//var auth        = require('../../auth'),
var controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {

    //create payment
    router.get('/payment/create/:method/:amount/:currency/:type/:itemID', controllers.payments.createPayment);
    
    //execute payment
    router.get('/payment/execute/:paymentID/:token/:payerID', controllers.payments.executePayment);

    //cancel payment
    //router.get('/payment/cancel', controllers.payments.cancelPayment);

    app.use('/api/', router);
};
