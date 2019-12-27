/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const assert = require('assert');
const path = require('path');

const HttpHandler = require('./httphandler');
const Router = require('../httprouter');
const Route = require('../httproute');
const ApiController = require('../apicontroller');
const HttpContext = require('../httpcontext');
const BaseResult = require('../httpresponseresult').BaseResult;

class RouteHandler extends HttpHandler {
    constructor(options) {
        super();

        this._options = {...{
            controllerFolderPath: './controller'
        }, ...options };
        
        this.router = new Router();
    }
    
    bind(server) {
        this.router.routes.forEach((route) => {
            const routePath = path.join('/', route.controllerName, route.actionName);
            const controllerPath = path.resolve('./controllers', route.controllerName + 'controller');
            const ControllerClass = require(controllerPath);
            const getHandler = (isGet) => {
                return (req, res, next) => {
                    const context = new HttpContext(req, res);
                    const controller = new ControllerClass(context);
                    assert(controller instanceof ApiController, 'Controllers must extends ApiController class');
                    const action = controller[route.actionName || 'index'];
                    const params = { ...req.query, ...req.body };

                    const result = action.call(controller, params);
                    if(result instanceof BaseResult) {
                        context.response.sendResult(result);
                    } else {
                        return next();
                    }
                };
            };

            switch(route.method) {
                case Route.METHOD.GET:
                    server.get(routePath, getHandler(true));
                    break;
                case Route.METHOD.POST:
                    server.post(routePath, getHandler(false));
                    break;
                case Route.METHOD.PUT:
                    server.put(routePath, getHandler(false));
                    break;
            }
        });
    }
}

module.exports = RouteHandler;