'use strict';

var mongoose = require('mongoose'),
    genres   = require('../filters/genres');

var bookSchema = mongoose.Schema({
    isbn: {
        type: String,
        unique: true,
        sparse: true,
        match: [
            /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/,
            'ISBN format is not valid'
        ]
    },
    title: {
        type: String,
        required: '{PATH} is required',
        match: [
            /^.{1,200}$/,
            'Title should be between 1 and 200 characters'
        ]
    },
    author: {
        type: String,
        required: '{PATH} is required',
        match: [
            /^.{1,200}$/,
            'Author\'s name should be between 1 and 200 characters'
        ]
    },
    pages: {
        type: Number,
        min: 1,
        max: 3500
    },
    language: {
        type: String,
        match: [
            /^.{2,50}$/,
            'Language should be between 2 and 50 characters'
        ]
    },
    publisher: {
        type: String,
        required: '{PATH} is required',
        match: [
            /^.{1,200}$/,
            'Publisher\'s name should be between 1 and 200 characters'
        ]
    },
    authorNationality: {
        type: String,
        match: [
            /^.{2,50}$/,
            'Author\'s nationality should be between 2 and 50 characters'
        ]
    },
    description: {
        type: String,
        validate: [
            function(v) {
                return v.length>0 && v.length<1500;
            },
            'Description should be between 0 and 1500 characters'
        ]
    },
    cover: {
        type: String,
        default: '/dist/images/missing-cover.png'
    },
    themes: [String],
    genres: {
        type: [String],
        enum: [genres.getAllGenres],
        default: ['Other']
    },
    edition: String,
    illustrated: String,
    published: Date,
    uploaded: {
        type: Date,
        default: Date.now
    },
    other: Object,
    ebookUrl: {
        type: String
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
            // Add some default books

            Book.create({
                'title': 'The Host',
                'author': 'Stephenie Meyer',
                'language': 'en',
                'pages': '624',
                'published': {
                    '$date': '2009-02-26T00:00:00.000Z'
                },
                'publisher': 'Hachette UK',
                'cover': 'http://bks5.books.google.com/books?id=TUVjJcCX3eQC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                'isbn': '9780748112548',
                'genres': [
                    'other'
                ],
                'themes': [
                    'Fiction'
                ],
                'description': 'The Host is a romance novel by Stephenie Meyer. The book is about Earth, in a post apocalyptic time, being invaded by a parasitic alien race, known as "Souls", and follows one Soul\'s predicament when the consciousness of her human host refuses to co-operate with the takeover of her body.'
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
                'title': 'Jane Eyre',
                'author': 'Charlotte Bronte',
                'language': 'en',
                'pages': '302',
                'published': {
                    '$date': '1984-01-01T00:00:00.000Z'
                },
                'isbn': '9781500712952',
                'publisher': 'Barnes & Noble',
                'genres': [],
                'themes': [
                    'Fiction'
                ],
                'description': 'Orphaned into the household of her Aunt Reed at Gateshead, subject to the cruel regime at Lowood charity school, Jane Eyre nonetheless emerges unbroken in spirit and integrity.'
            });

            Book.create({
                'title': 'Timecaster',
                'author': 'Joe Kimball',
                'language': 'en',
                'pages': '306',
                'published': {
                    '$date': '1970-01-01T00:00:02.011Z'
                },
                'publisher': 'Penguin',
                'cover': 'http://bks7.books.google.com/books?id=mELmjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                'isbn': '0441019188',
                'genres': [],
                'themes': [
                    'Fiction'
                ],
                'description': 'Chicago, 2064: Talon Avalon is a timecaster-one of a select few peace officers who can operate a TEV, the Tachyon Emission Visualizer, which records events (most specifically, crimes) that have already happened. With crime at an all-time low, Talon has little to do except give lectures to school kids and obsess on his wife\'s profession as a licensed sex partner. Until one of her clients asks Talon to investigate a possible murder. When Talon uses the TEV to view the crime, the identity of the killer is unmistakable-it\'s him, Talon Avalon.'
            });

            Book.create({
                'title': 'Програмиране на C++',
                'author': 'Магдалина Тодорова',
                'language': 'bg',
                'pages': '376',
                'published': {
                    '$date': '2010-01-01T00:00:02.002Z'
                },
                'isbn': '9789546494542',
                'publisher': 'Ciela',
                'themes': [
                    'Обектно- ориентирано програмиране'
                ],
                'description': 'Книгата съдържа изложение на трисеместриалния курс по програмиране с модули: Увод в програмирането, структури от данни и програмиране и Обектно-ориентирано програмиране за студентите от специалност "Информатика" на Факултета по математика и информатика на СУ "Св. Кл. Охридски". В нея разглеждането на основните конструкции на конвенционалното и обектно-ориентираното програмиране е съчетано с изучаването на езика С++. Специално внимание е отделено и на актуалното в теоретично отношение направление на компютърната наука - синтезиране на програми. Предложен е подход за синтезиране на програми от подмножеството на езика С++, наречен метод на преобразуващите предикати.'
            });

            console.log('Books added to the database...');

        }
    });
};
