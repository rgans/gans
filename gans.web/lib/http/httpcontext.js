/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

var HttpRequest = require('./httprequest');
var HttpResponse = require('./httpresponse');

class HttpContext {
    constructor(req, res) {
        this.request = new HttpRequest(req);
        this.response = new HttpResponse(res);
    }
}

module.exports = HttpContext;
