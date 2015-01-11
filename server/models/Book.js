'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    isbn: {
        type: String,
        unique: true,
        sparse: true
    },
    title: {
        type: String,
        require: '{PATH} is required'
    },
    author: {
        type: String,
        require: '{PATH} is required'
    },
    description: String,
    publisher: {
        type: String,
        require: '{PATH} is required'
    },
    cover: {
        type: String,
        default: '/dist/images/missing-cover.png'
    },
    authorNationality: String,
    language: String,
    pages: String,
    themes: [String],
    genres: [String],
    edition: String,
    illustrated: String,
    published: Date,
    uploaded: {
        type: Date,
        default: Date.now
    }
});

var Book = mongoose.model('Book', bookSchema);

module.exports.seedInitialBooks = function() {
    Book.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Books: ' + err);
            return;
        }
        
        if (collection.length === 0) {

            Book.create({
                'author': 'Stephenie Meyer',
                'language': 'en',
                'pages': '624',
                'published': {
                    '$date': '2009-02-26T00:00:00.000Z'
                },
                'publisher': 'Hachette UK',
                'cover': 'http://bks5.books.google.com/books?id=TUVjJcCX3eQC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                'title': 'The Host',
                'isbn': '9780748112548',
                'genres': [
                    'other'
                ],
                'themes': [
                    'Fiction'
                ]
            });


            Book.create({
                'title': 'Страховитото в историята: Англия',
                'author': 'Тери Диъри',
                'illustrated': 'Не',
                'cover': 'http://www.booksinprint.bg/images/PublicationImages/a2/86469.jpeg',
                'publisher': 'Егмонт България',
                'authorNationality': 'Великобритания',
                'language': 'Български',
                'description': 'В тази книга се разкриват ужасните събития, които са направили Англия такава, каквато е днес \u2013 от времето на кръвожадните келти до безумния ХХ век. Тук ще разбереш: * Кой монах се е опитал да ощипе дявола по носа с щипка? * Защо някои хора през Средните векове са яли изпражнения на гълъби? * Кой крал е бил обвинен, че е върколак?Вражески нашествия, въстания и гражданска война, чума и пожари, ростбиф, риба и пържени картофи, чай \u2013 тук е събрано всичко, свързано с англичаните.Прочети за нещастията на средновековните монарси, открий десет начина да загинеш в мина през викторианската епоха и научи кои страшни дни от историята да отбелязваш с почивен ден от училище.',
                'edition': '1',
                'pages': '192',
                'isbn': '9789542701064',
                'genres': [
                    'Научно-популярна'
                ],
                'themes': [
                    'История'
                ]
            });

            Book.create({
                'author': 'Charlotte Bronte',
                'language': 'en',
                'pages': '302',
                'published': {
                    '$date': '2014-08-02T00:00:00.000Z'
                },
                'title': 'Jane Eyre',
                'isbn': '9781500712952',
                'publisher': 'i dunno',
                'genres': [],
                'themes': [
                    'Fiction'
                ]
            });

            Book.create({
                'author': 'Joe Kimball',
                'language': 'en',
                'pages': '306',
                'published': {
                    '$date': '1970-01-01T00:00:02.011Z'
                },
                'publisher': 'Penguin',
                'cover': 'http://bks7.books.google.com/books?id=mELmjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                'title': 'Timecaster',
                'isbn': '0441019188',
                'genres': [],
                'themes': [
                    'Fiction'
                ]
            });


            Book.create({
                'author': 'Магдалина Тодорова',
                'language': 'bg',
                'pages': '376',
                'published': {
                    '$date': '1970-01-01T00:00:02.002Z'
                },
                'title': 'Програмиране на C++',
                'isbn': '9789546494542',
                'publisher': 'Ciela',
                'uploaded': {
                    '$date': '2014-12-03T11:19:54.062Z'
                },
                'themes': [
                    'Обектно- ориентирано програмиране'
                ]
            });

        }
    });
};
