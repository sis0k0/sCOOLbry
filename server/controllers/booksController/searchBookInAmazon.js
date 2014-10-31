'use strict';

var	OperationHelper = require('apac').OperationHelper;

// Define the App's specific API IDs
var opHelper = new OperationHelper({
	awsId:	 'AKIAJZUE2QXUPB2R3YAQ',
	awsSecret: '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',
	assocId:   'sc01d7-20'
});


module.exports = function (req, res) {

	// Remove the '-' from the isbn, because of the specifics of the search in amazon
	var isbn = req.params.isbn;
	isbn = isbn.replace(/-/gi, '');

	// Specify the item type based on the ISBN type (ISBN-10 or ISBN-13)
	var itemType;
	if(isbn.length===10) {
		itemType = 'ISBN';
	} else {
		itemType = 'EAN';
	}

	// Perform the search
	opHelper.execute('ItemLookup', {
	  'SearchIndex': 'Books',
	  'IdType': itemType,
	  'ItemId': isbn,
	  'ResponseGroup': 'Large'
	}, function(results) {

		if(!results.ItemLookupResponse.Items[0].Request[0].Errors) {


			var book = {};

			if(results.ItemLookupResponse.Items[0].Item[0].hasOwnProperty('LargeImage')) {
				book.cover = results.ItemLookupResponse.Items[0].Item[0].LargeImage[0].URL[0];
			}

			var returnedObject = results.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0];

			if(returnedObject.hasOwnProperty('Author')) {
				book.author = returnedObject.Author[0];
			}

			if(returnedObject.hasOwnProperty('Publisher')) {
				book.publisher = returnedObject.Publisher[0];
			}

			if(returnedObject.hasOwnProperty('Edition')) {
				book.edition = returnedObject.Edition[0];
			}

			if(returnedObject.hasOwnProperty('Languages')) {
				if(returnedObject.Languages[0].hasOwnProperty('Language')) {
					book.language = returnedObject.Languages[0].Language[0].Name;
				}
			}

			if(returnedObject.hasOwnProperty('NumberOfPages')) {
				book.pages = returnedObject.NumberOfPages[0];
			}

			if(returnedObject.hasOwnProperty('ReleaseDate')) {
				book.published = returnedObject.ReleaseDate[0];
			}

			if(returnedObject.hasOwnProperty('Title')) {
				book.title = returnedObject.Title[0];
			}

			res.send(book);
		} else {
			res.send(false);
		}
	});
};