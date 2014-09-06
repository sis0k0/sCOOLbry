'use strict';

var genres = [
	'absurdistFiction',
	'adventureNovel',
	'comicNovel',
	'education',
	'experimentalFiction',
	'eroticFiction',
	'historialNovel',
	'literaryFiction',
	'mathematicalFiction',
	'nonfictionNovel',
	'occupationalFiction',
	'philosophicalFiction',
	'politicalFiction',
	'pulpFiction',
	'quantumFiction',
	'religiousFiction',
	'saga',
	'speculativeFiction',
	'suspenseFiction',
	'women\'sFiction', 
	'tradegy',
	'urbanFiction',
	'thriller',
	'other'
	];


module.exports = {
	getAllGenres: function(req, res) {
		res.send(genres);
	}
};