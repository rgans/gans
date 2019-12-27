/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const assert = require('assert');
const result = require('./httpresponseresult');
const BaseResult = result.BaseResult;
const ViewResult = result.ViewResult;
const JsonResult = result.JsonResult;
const StatusResult = result.StatusResult;

class HttpResponse {
    constructor(res) {
        this._res = res;
    }
    
    sendResult(result) {
        if(result instanceof JsonResult) {
            this._res.json(result.json);
        } else if (result instanceof ViewResult) {
            this._res.render(result.viewPath, result.viewArgs);
        } else if (result instanceof StatusResult) {
            this._res.send(result.status);
        } else {
            this._res.send(500);
        }
    }
    

}

module.exports = HttpResponse;
