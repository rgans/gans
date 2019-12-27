/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const HttpHandler = require('./httphandler');

class ErrorHandler extends HttpHandler {
    constructor() {
        super();
    }
    
    bind(server) {
        super.bind(server);
        
        server.on('notFound', function(req, res, route, err) {
            console.log('ERROR: notFound');
        });

        server.on('methodNotAllowed', function(req, res, route, err) {
            console.log('ERROR: methodNotAllowed');
        });

        server.on('versionNotAllowed', function(req, res, route, err) {
            console.log('ERROR: versionNotAllowed');
        });

        server.on('unsupportedMediaType', function(req, res, route, err) {
            console.log('ERROR: unsupportedMediaType');
        });

        server.on('uncaughtException', function(req, res, route, err) {
            console.log('ERROR: uncaughtException');
        });

        server.on('after', function(req, res, route, err) {
            console.log('ERROR: after');
        });
    }
}

module.exports = ErrorHandler;