'use strict';

var imgur = require('imgur-node-api');

module.exports = function(req, res) {
		   
	var currentPath = '../../../'+req.files.uploadedFile.path;
	var path = require('path');

	var mimetype = req.files.uploadedFile.mimetype.toString();
	
	if(!(mimetype==='image/gif' || mimetype==='image/jpeg' || mimetype==='image/png' || mimetype==='image/tiff')){
		res.status(403).send('Invalid mime type');
	}else{
		var imgurURL = '';
		imgur.setClientID('de1c5c887fbf774');
		imgur.upload(path.join(__dirname, currentPath),function(err, res2){
			if(res2 === undefined || res2.data === undefined) {
				res.status(502).send('Cannot connect to server.');
			}
			imgurURL= res2.data.link;
			imgurURL = imgurURL.substring(0,imgurURL.lastIndexOf('.')) + 'm.' + imgurURL.substring(imgurURL.lastIndexOf('.')+1, imgurURL.length);
			res.send(imgurURL);
		});
	}

	var fs = require('fs');
	
	fs.unlink(path.join(__dirname, currentPath));

};