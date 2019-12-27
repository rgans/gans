/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

class UserPrincipal {
    construct(ticket) {
        this._ticket = ticket;
    }
    
    isInRole(role) {}
}

module.exports = UserPrincipal;