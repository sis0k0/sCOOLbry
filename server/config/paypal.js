'use strict';

var paypal = require('paypal-rest-sdk');

module.exports = function() {

	paypal.configure({
  		'mode': 'sandbox', //sandbox or live 
  		'client_id': 'AQsN8g6xLYQDqd6eRFBtRrGLKYgUjLUafXEg9UWbLzxNOKcsNyjppv5qK5np26LxoI19brIN8ctGsktP',
  		'client_secret': 'EIndhDlrvYBxDz9O1VVlYUy14MWcs9FY0YhqkTAxYnfUVSgrfa5ZHcwYCBUqCRw-3MoBSvY51IugsCzv'
	});

};