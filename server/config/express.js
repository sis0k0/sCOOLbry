'use strict';

var express      = require('express'),
    stylus       = require('stylus'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    passport     = require('passport'),
    multer       = require('multer');

module.exports = function(app, config) {

    // Set view engine - jade
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    // Configure cookie parser and body parser
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Configure multer
    app.use(multer({ dest: './server/uploads/',
        limits: {
            fieldNameSize: 100,
            files: 2,
            fields: 5,
            fileSize: 50000000
        },
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is being uploaded...');
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to    ' + file.path);
        }
    }));

    // Configure express session
    app.use(
        session({
                secret: 'pwF1Kv7CJ0F33MAQeXP5hUJf7344bz', 
                saveUninitialized: true,
                resave: true
        })
    );

    // Configure middleware for compiling stylus to css
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function(str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));

    // Configure passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public'));
};
