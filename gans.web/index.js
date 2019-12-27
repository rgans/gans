/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

module.exports = {
    http: {
        handlers: {
            HttpHandler: require('./lib/http/handlers/httphandler'),
            ErrorHandler: require('./lib/http/handlers/errorhandler'),
            RouteHandler: require('./lib/http/handlers/routehandler')
        },
        security: {
            AuthorizationServerHandler: require('./lib/http/security/authorizationserverhandler'),
            AuthorizationTokenProvider: require('./lib/http/security/authorizationtokenprovider')
        },

        ApiController: require('./lib/http/apicontroller'),
        Route: require('./lib/http/httproute')
    },
    WebServer: require('./lib/webserver')
};