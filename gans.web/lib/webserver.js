/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const restify = require('restify');
const assert = require('assert');
const HttpHandler = require('./http/handlers/httphandler');
//const debug = require('debug')('WMS:[SERVER]');

const EventEmitter = require('events');
//const HttpApplication = require('./http/httpapplication');

class WebServer {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this._handlers = [];
        
        this._server = restify.createServer({
            name: 'myapp',
            version: '1.0.0',
            /*
            formatters: {
                'application/foo': function formatFoo(req, res, body, cb) {
                    if (body instanceof Error)
                        return body.stack;

                    if (Buffer.isBuffer(body))
                        return cb(null, body.toString('base64'));

                    return cb(null, util.inspect(body));
                }
            }
            */
        });
    }
    
    OnApplicationInit(cb) {
        this.eventEmitter.on('_APP_INIT_', (config) => { cb(config); });
    }
    
    _raiseApplicationInitEvent(config) {
        this.eventEmitter.emit('_APP_INIT_', config);
    }
    
    OnApplicationMap(cb) {
        this.eventEmitter.on('_APP_MAP_', (router) => { cb(router); });
    }
    
    _raiseApplicationMapEvent(router) {
        this.eventEmitter.emit('_APP_MAP_', router);
    }
    
    registerHandler(handler) {
        assert(handler instanceof HttpHandler, 'Invalid argument exception');
        
        handler.bind(this._server);
        
        this._handlers.push(handler);
    }
    
    start() {
        const $srv = this._server;
        
        $srv.use(restify.plugins.gzipResponse());
        $srv.use(restify.plugins.acceptParser($srv.acceptable));
        $srv.use(restify.plugins.multipartBodyParser());
        $srv.use(restify.plugins.urlEncodedBodyParser());
        $srv.use(restify.plugins.queryParser());
        $srv.use(restify.plugins.bodyParser());
        $srv.use(restify.plugins.jsonp());
        $srv.use(restify.plugins.dateParser());
        
        $srv.listen(3000, function () {
            console.log('%s listening at %s', $srv.name, $srv.url);
        });
    }
}

module.exports = WebServer;
