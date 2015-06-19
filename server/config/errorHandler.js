'use strict';

/*jshint unused:false*/
var errorHandler = function(app) {


    app.use(function logErrors(err, req, res, next) {

        console.error('ERROR!');
        console.error(req.method + ' ' + req.url);
        console.error(err);

        next(err);
    });

    app.use(function returnErrorToUser(err, req, res, next) {

        // console.log(req.accepts());
        var status = err.statusCode || 500;
        res.status(status).send({
            status: status,
            message: err.message,
            error: (app.get('env') === 'development') ? err : undefined
        });
    });
};

module.exports = errorHandler;
/*jshint unused:true*/
