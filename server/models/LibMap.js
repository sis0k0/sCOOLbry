'use strict';

var mongoose = require('mongoose');

var libMapSchema = mongoose.Schema({
    libraryID: String,
    map: Object
});

var LibMap = mongoose.model('LibMap', libMapSchema);

module.exports.seedInitialLibMap = function() {
    LibMap.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
		}
		
        if (collection.length === 0) {
            LibMap.remove({}, function() {});
            //add default map, maybe
        }
    });
};
