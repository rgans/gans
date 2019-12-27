/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const debug = require('debug')('WMS:[Application]');

const HttpRouter = require('./httprouter');

class HttpApplication {
    constructor(server) {
        this.webServer = server;
        this.router = new HttpRouter();
        
        const createError = require('http-errors');
        const express = require('express');
        const path = require('path');
        const cookieParser = require('cookie-parser');
        const logger = require('morgan');
        this._app = express();

        // view engine setup
        //this._app.set('views', '');
        this._app.set('view engine', 'pug');
        this._app.set('port', this.webServer.port);

        this._app.use(logger('dev'));
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));
        this._app.use(cookieParser());
        //this._app.use(express.static(''));

        this._app.use(this._createRouter());

        // catch 404 and forward to error handler
        this._app.use(function(req, res, next) {
          next(createError(404));
        });

        // error handler
        this._app.use(function(err, req, res, next) {
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};

          // render the error page
          res.status(err.status || 500);
          res.render('error');
        });
    }
    
    _createRouter() {
        const express = require('express');
        const expressRouter = express.Router();
        const HttpContext = require('./httpcontext');

        this.router.routes.forEach((r) => {
            switch(r.method) {
                case 'GET':
                    expressRouter.get(r.path, (req, res, next) => {
                        const context = new HttpContext(req, res);
                        const controller = new r.controller(context);
                        r.fun.apply(controller);
                    });
                    break;
            }
        });
        
        return expressRouter;
    }
    
    handle() {
        return this._app;
    }
}

module.exports = HttpApplication;
