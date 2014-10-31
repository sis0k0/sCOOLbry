'use strict';

var	OperationHelper = require('apac').OperationHelper;


module.exports = function (req, res) {

	var isbn = req.params.isbn;
	isbn = isbn.replace(/-/gi, '');
	console.log('ISBN ' + isbn);

	var opHelper = new OperationHelper({
		awsId:	 'AKIAJZUE2QXUPB2R3YAQ',
		awsSecret: '06Ig9jxnvG+iOLvcCGrOK4jyrYDLfJ/3s+q570ce',
		assocId:   'sc01d7-20'
	});

	opHelper.execute('ItemLookup', {
	  'SearchIndex': 'Books',
	  'IdType': 'EAN',
	  'ItemId': isbn,
	  'ResponseGroup': 'Large'
	}, function(results) {

		if(!!results.ItemLookupResponse.Items[0].Request[0].Errors) {
			res.send(false);
		} else {
			res.send(results);
		}
	});
};