'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var eBookSchema = mongoose.Schema({
    // title: {
    //     type: String,
    //     required: '{PATH} is required'
    // },
    path: {
        type: String,
        required: '{PATH} is required'
    },
    chapters: {
        type: [String],
        // required: '{PATH} is required',
        // text : true
    },
    uploaderID: {
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    },
    books: [{
        type: ObjectId,
        ref: 'Book'
    }],
    uploaded: {
        type: Date,
        default: Date.now
    }
});

var eBook = mongoose.model('eBook', eBookSchema);

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
