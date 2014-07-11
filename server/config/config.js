var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/telerikacademycourses',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mmongodb://admin:test@ds053109.mongolab.com:53109/scoolbry',
        port: process.env.PORT || 3030
    }
}

