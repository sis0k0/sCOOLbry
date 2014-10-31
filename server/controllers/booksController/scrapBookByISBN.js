'use strict';

var	request         = require('request'),
	cheerio         = require('cheerio');

module.exports = function(req, res) {

	var isbn = req.params.isbn,
		url  = 'http://www.booksinprint.bg/Publication/Search?SearchCriteria=ISBN%3A' + isbn + '%3AAnd&page=1';

	request(url, function(error, response, html){

		if(error){
			console.log(error);
			res.send(false);
		}else{

			var $ = cheerio.load(html);
			var bookUrl = $('#resultsContainer .title a').attr('href');

			if(!!bookUrl)
			{
				bookUrl = 'http://www.booksinprint.bg' + bookUrl;
				request(bookUrl, function(error, response, html){
					if(error){
						console.log(error);
						res.send(false);
					}else{
						var $ = cheerio.load(html);

						var labels = [];
						$('.display-label').each(function() { 
							var content = $(this).text();


							content = content.replace('\n', '');
							content = content.replace('\r', '');
							content = content.trim();

							labels.push(content);

						});

						var fields = [];
						$('.display-field').each(function() { 


							var content = $(this).text();

							if(content.indexOf('$(function')>-1){
								content = 'http://www.booksinprint.bg' + $('.image a').attr('href');
							}else{
								content = content.replace('\n', '');
								content = content.replace('\r', '');
								content = content.trim();
							}

							fields.push(content);
						});

						var json = {};

						for(var i=0; i<labels.length; i++){
							if(!!labels[i] && fields[i]){
								json[labels[i]] = fields[i];
							}
						}

						console.log(json);
						res.send(json);


					}
				});

			}else{
				console.log('not found');
				res.send(false);
			}

		}
	});
};