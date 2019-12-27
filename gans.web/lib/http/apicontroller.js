/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const result = require('./httpresponseresult');
const BaseResult = result.BaseResult;
const ViewResult = result.ViewResult;
const JsonResult = result.JsonResult;
const StatusResult = result.StatusResult;

class ApiController {
    constructor(ctx) {
        this.context = ctx;
    }
    
    HTTP_STATUS = {
        OK: 200,
        ERROR: 500
    }
    
    viewResult(resPath, ...args) {
        return new ViewResult(resPath, args);
    }
    
    jsonResult(json) {
        return new JsonResult(json);
    }
    
    statusResult(status) {
        return new StatusResult(status);
    }
}

module.exports = ApiController;
