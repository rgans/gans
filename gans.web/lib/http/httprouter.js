/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const assert = require('assert');
const Route = require('./httproute');

class HttpRouter {
    constructor() {
        this.routes = [];
    }
    
    get(controllerName, actionName){
        this.route(new Route(Route.METHOD.GET, controllerName, actionName));
    }
    post(controllerName, actionName){
        this.route(new Route(Route.METHOD.POST, controllerName, actionName));
    }
    put(controllerName, actionName){
        this.route(new Route(Route.METHOD.PUT, controllerName, actionName));
    }
    del(controllerName, actionName){
        this.route(new Route(Route.METHOD.DEL, controllerName, actionName));
    }
    
    route(route) {
        assert(route instanceof Route, 'Invalid argument exception');
        this.routes.push(route);
    }
}

module.exports = HttpRouter;
