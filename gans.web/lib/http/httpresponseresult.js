/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const assert = require('assert');

class HttpResponseResult {
    constructor() {
    }
}

class HttpResponseViewResult extends HttpResponseResult {
    constructor(viewPath, ...args) {
        super();
        assert(typeof viewPath === 'string', 'Invalid argument exception');
        
        this.viewPath = viewPath;
        this.viewArgs = args;
    }
}

class HttpResponseJsonResult extends HttpResponseResult {
    constructor(json) {
        super();
        assert(typeof json === 'object', 'Invalid argument exception');
        
        this.json = json;
    }
}

class HttpResponseStatusResult extends HttpResponseResult {
    constructor(status) {
        super();
        assert(typeof status === 'number', 'Invalid argument exception');
        
        this.status = status;
    }
}

module.exports = {
    BaseResult: HttpResponseResult,
    ViewResult: HttpResponseViewResult,
    JsonResult: HttpResponseJsonResult,
    StatusResult: HttpResponseStatusResult
};