/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

class AuthorizationTicket {
    constructor(identity, props) {
        this.identity = identity;
        this.properties = props || {};
        this.issuedUtc = null;
        this.expiresUtc = null;
        this.clientId = null;
    }
}

module.exports = AuthorizationTicket;