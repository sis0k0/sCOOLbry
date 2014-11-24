'use strict';

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/scoolbry',
        port: process.env.PORT || 3030,
        facebook: {
            clentID: '1511950165721139',
            clientSecret: '50654ed9ad9c437720974dbe782949ed',
            callbackURL: 'http://127.0.0.1:3030/auth/facebook/callback'
        }
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:test@ds053109.mongolab.com:53109/scoolbry',
        port: process.env.PORT || 3030
    }
};
