'use strict';

var mongoose = require('mongoose');
// var mongoosastic = require('mongoosastic');
//var ObjectId = mongoose.Schema.ObjectId;

var eBookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    path: {
        type: String,
        required: '{PATH} is required'
    },
    chapters: {
        type: [String],
        required: '{PATH} is required',
        text : true
    },
    // uploaderID: {
    //     type: ObjectId,
    //     ref: 'User',
    //     required: '{PATH} is required'
    // },
    uploaded: {
        type: Date,
        default: Date.now
    }
});

var eBook = mongoose.model('eBook', eBookSchema);

eBook.on('index', function(err) {
    if (err) {
        console.error('eBook index error: %s', err);
    } else {
        console.info('eBook indexing complete');
    }
});

module.exports.seedInitialEbooks = function() {
    eBook.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find EBooks: ' + err);
            return;
        }
        
        if (collection.length === 0) {
        }
    });
};
