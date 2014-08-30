'use strict';

var mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
    name: String,
    address: String,
    featured: String,
    description: String,
    published: Date,
    ownerId: String,
    tags: [String]
});

var Library = mongoose.model('Library', librarySchema);

module.exports.seedInitialLibraries = function() {
    Library.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
		}
		
        if (collection.length === 0) {
            Library.create({name: 'ПМГ Бургас', featured: true, published: new Date('19/8/2014'), tags: ['ученическа библиотека, българска литература, световна литература']});
            Library.create({name: 'Библиотека на ТКЗС в с. Библиотекарово', featured: true, published: new Date('19/8/2014'), tags: ['селскостопанска литература, български класици']});
            Library.create({name: 'Публичната библиотека на дядо Матейко', featured: false, published: new Date('19/8/2014'), tags: ['български класици']});
            Library.create({name: 'Книжки ще има за всички от сърце', featured: false, published: new Date('19/8/2014'), tags: ['детска литература']});
            Library.create({name: 'Библиотека за програмисти', featured: true, published: new Date('19/8/2014'), tags: ['техническа литература', 'програмиране']});
            Library.create({name: 'Библиотека "For Dummies"', featured: true, published: new Date('19/8/2014'), tags: ['самообучители']});
        }
    });
};
