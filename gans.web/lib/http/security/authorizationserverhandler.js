/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

const AuthorizationTicket = require('./authorizationticket');
const AuthorizationTokenProvider = require('./authorizationtokenprovider');
const UserPrincipal = require('./userprincipal');
const HttpContext = require('../httpcontext');

class AuthorizationServerHandler {
    constructor(req, res, opts) {
        this.httpContext = new HttpContext(req, res);
        this.options = Object.assign({
            tokenEndpointPath: '/authorize',
            provider: null,
            tokenProvider: new AuthorizationTokenProvider()
        }, opts);
    }
    
    async invoke() {
        const path = this.httpContext.request.path;
        if(this.options.tokenEndpointPath === path) {
            return await invokeTokenEndpoint();
        } else {
            const authorization = this.httpContext.request.header('authorization');
            if(authorization) {
                const token = authorization.split(' ');
                if(token.length === 2) {
                    const tokenType = token[0];
                    const tokenValue = token[1];
                    
                    let tokenReceivedContext = new AuthorizationTokenContext(token, tokenType);
                    await this.options.tokenProvider.receive(tokenReceivedContext);
                    
                    if(tokenReceivedContext.ticket) {
                        this.httpContext.request.user = new UserPrincipal(tokenReceivedContext.ticket);
                        return false;
                    }
                }
                
                this._sendError('invalid_authorization_token', '');
                return true;
            }
        }
        
        return false;
    }
    
    async invokeTokenEndpoint() {
    }
    
    _sendError(code, desc) {}
}

class AuthorizationTokenContext {
    constructor(ticket, token, tokenType) {
        if(ticket instanceof AuthorizationTicket)
        {
            this._ticket = ticket;
            this._token = token;
            this._tokenType = tokenType;
        } else {
            this._ticket = null;
            this._token = token;
            this._tokenType = tokenType;
        }
    }
    
    get tokenType() { return this._tokenType; }
    set tokenType(type) { this._tokenType = type; }
    
    get token() { return this._token; }
    set token(token) { this._token = token; }
    
    get ticket() { return this._ticket; }
    set ticket(token) { this._ticket = ticket; }
    
    serializeTicket() {}
    deserializeTicket(ticketData) {}
}

module.exports = (opts) => {
    return (req, res, next) => {
        const handler = new AuthorizationServerHandler(req, res, opts);
        handler.invoke()
        .then(handled => {
            if(!handled) next();
        })
        .catch(e => {
            //TODO: Send error 500
        });
    };
};