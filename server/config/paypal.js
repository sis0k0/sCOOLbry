'use strict';

var paypal = require('paypal-rest-sdk');

module.exports = function() {

	paypal.configure({
  		'mode': 'sandbox', //sandbox or live 
  		'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  		'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
	});

};