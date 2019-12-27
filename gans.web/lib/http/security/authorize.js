/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

class Authorize {
    construct() {
        const requestToken = null;
        const authorization = this.context.request.header('authorization');
        if(authorization) {
            const token = authorization.split(' ');
            if(token.length === 2) {
                const tokenType = token[0];
                const tokenValue = token[1];

                let tokenReceivedContext = new AuthorizationTokenContext(token, tokenType);
                await this.options.tokenProvider.receive(tokenReceivedContext);

                if(tokenReceivedContext.ticket) {
                    this.
                }
            }
        }
    }
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