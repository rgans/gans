/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

class Enum {
    constructor(obj) {
        if(Array.isArray(obj)) {
            for (const key in obj) {
                this[obj[key]] = obj[key];
            }
        } else if(typeof obj === 'object') {
            Object.keys(obj).forEach(function(key) {
                this[key] = obj[key];
            });
        }

        return Object.freeze(this);
    }
    
    has(key) {
        return this.hasOwnProperty(key);
    }
}

module.exports = Enum;