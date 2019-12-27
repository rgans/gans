/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const assert = require('assert');
const Enum = require('../enum');

class HttpRoute {
    constructor(method, controllerName, actionName) {
        assert(HttpRoute.METHOD.has(method), 'Invalid argument exception');
        
        this.method = method;
        this.controllerName = controllerName || '';
        this.actionName = actionName || '';
    }
    
    static METHOD = new Enum(['GET', 'POST'])
}

module.exports = HttpRoute;