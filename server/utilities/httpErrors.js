'use strict';

var STATUS_CODES = require('http').STATUS_CODES;

var getMongoErrorsCode = function (code) {
    var codes = {
        '11000': 409, // Conflict. The field already exists and its unique
        '11001': 409  // Same as above, but deprecated
    };

    return codes[code] || 502;
};


var getMongooseHttpCode = function (err) {
    var statusCode = 500;

    switch (err.name) {
        case 'CastError':
        case 'ValidationError':
            statusCode = 400;
            // It isn't a validation/cast error to user. Let's considerate that this id doesn't exists at all.
            if (err.kind === 'ObjectId' && err.path === '_id') {
                statusCode = 404;
            }
            break;
        case 'MongoError':
            statusCode = getMongoErrorsCode(err.code);
            break;
    }

    return statusCode;
};

// ----------------------------------------------------------------------------------------------------------------------------------
// Errors 'classes'

// Client errors => authorization, authentication, etc.
function ClientError(statusCode) {
    this.prototype = Error.prototype;
    Error.captureStackTrace(this, this.constructor);

    // If no arguments are passed, create simple 400 (bad request) client error
    if(!arguments.length) {
        this.name = 'ClientError';
        this.statusCode = 400;
        this.message = STATUS_CODES[this.statusCode];
    } else {
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = STATUS_CODES[statusCode];
    }
}

function DatabaseError(error, resourceName) {
    this.prototype = Error.prototype;
    Error.captureStackTrace(this, this.constructor);

    // If no arguments are passed, create simple 503 (service unavailable) database error
    if(!arguments.length) {
        this.name = 'DatabaseError';
        this.statusCode = 503;
        this.message = 'Cannot connect to database!';
    } else if(error) {
        this.name = error.name;
        this.statusCode = getMongooseHttpCode(error);
        this.message = (this.statusCode === 404) ? resourceName + ' ' + STATUS_CODES[this.statusCode] : error.message;
        this.error = error;
    } else {
        // If the error passed was an empty object, then the error was throwed by an undefined resource (no resource found)
        this.name = 'Not found';
        this.statusCode = 404;
        this.message = resourceName + ' ' + STATUS_CODES[this.statusCode];
    }
}

module.exports = {
    ClientError: ClientError,
    DatabaseError: DatabaseError
};