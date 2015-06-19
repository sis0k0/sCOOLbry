'use strict';

var express  = require('express');
var http     = require('http');
var socketio = require('socket.io');
var passport = require('passport');

var env = process.env.NODE_ENV || 'production';

var app = express();
var config = require('./server/config/config')[env];


// Middlewares
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')(config);
require('./server/config/paypal')(config);

// Routes
require('./server/config/routes')(app, config);

// Error handler
require('./server/config/errorHandler')(app);


var server = http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

// Use passport middlewares
app.use(passport.initialize());
app.use(passport.session()); 

app.get('server').listen(config.port);
console.log('Server running on port: ' + config.port);
