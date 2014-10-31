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


						// Make a book object that has properties, analogous to the app's Book Model
						var book = {};

						if(json.hasOwnProperty('Заглавие')) {
							book.title = json['Заглавие'];
						}

						if(json.hasOwnProperty('Автори')) {
							book.author = json['Автори'];
						}

						if(json.hasOwnProperty('Илюстрирано')) {
							book.illustrated = json['Илюстрирано'];
						}

						if(json.hasOwnProperty('Илюстрации на корица')) {
							book.cover = json['Илюстрации на корица'];
						}

						if(json.hasOwnProperty('Издател')) {
							book.publisher = json['Издател'];
						}

						if(json.hasOwnProperty('Националност на автора')) {
							book.authorNationality = json['Националност на автора'];
						}

						if(json.hasOwnProperty('Език')) {
							book.language = json['Език'];
						}

						if(json.hasOwnProperty('Тематики')) {
							book.themes = json['Тематики'].split(',');
						}

						if(json.hasOwnProperty('Жанр')) {
							book.genres = [];
							book.genres.push(json['Жанр']);
						}


						if(json.hasOwnProperty('Описание')) {
							book.description = json['Описание'];
						}

						if(json.hasOwnProperty('Поредност на изданието')) {
							book.edition = json['Поредност на изданието'];
						}

						if(json.hasOwnProperty('Планирана дата на издаване')) {
							book.published = json['Планирана дата на издаване'];
						}

						if(json.hasOwnProperty('Страници')) {
							book.pages = json['Страници'];
						}

						console.log(json);
						res.send(book);


					}
				});

			}else{
				console.log('not found');
				res.send(false);
			}

		}
	});
};