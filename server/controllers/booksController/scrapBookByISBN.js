'use strict';

var	request         = require('request'),
	cheerio         = require('cheerio');

module.exports = function(req, res) {

	var isbn = req.params.isbn;

	// The search at booksinprint.bg requires the isbn to have '-'
	var insertAtString = function (index, string, stringToInsert) {
		if (index > 0) {
			return string.substring(0, index) + stringToInsert + string.substring(index, string.length);
		}
		else{
			return stringToInsert + string;
		}
	};

	if(isbn.indexOf('-')===-1) {
		isbn = (isbn.length===13) ? isbn.substring(6, isbn.length) : isbn.substring(3, isbn.length);

		isbn = (isbn[0] === '8' || isbn[0] === '9') ? insertAtString(4, isbn, '-') : insertAtString(3, isbn, '-');

		isbn = insertAtString(isbn.length-1, isbn, '-');

	}

	// Make a request to the website and scrap the content

	var url = 'http://www.booksinprint.bg/Publication/Search?SearchCriteria=ISBN%3A' + isbn + '%3AAnd&page=1';

	request(url, function(error, response, html){

		if(error){
			console.log(error);
			res.send(false);
		}else{


			var $ = cheerio.load(html),
				bookUrl = $('#resultsContainer .title a').attr('href');

			// If the search results containt a book, make a request to its inner page and scrap the content
			if(!!bookUrl)
			{
				bookUrl = 'http://www.booksinprint.bg' + bookUrl;
				request(bookUrl, function(error, response, html){
					if(error){
						console.log(error);
						res.send(false);
					}else{
						var $ = cheerio.load(html);

						// Scrap all labels
						var labels = [];
						$('.display-label').each(function() { 
							var content = $(this).text();

							content = content.replace('\n', '');
							content = content.replace('\r', '');
							content = content.trim();

							labels.push(content);

						});

						// Scrap all fields
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

						// Match the labels to the fields in one object
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

						if(json.hasOwnProperty('Илюстрации на корица') && json['Илюстрации на корица']!=='http://www.booksinprint.bg#') {
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
							var date = json['Планирана дата на издаване'];

							date = date.replace(/\./gi, '/');
							date = new Date(date);
							book.published = date;
						}

						if(json.hasOwnProperty('Страници')) {
							book.pages = json['Страници'];
						}
						console.log('booksinprint');
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