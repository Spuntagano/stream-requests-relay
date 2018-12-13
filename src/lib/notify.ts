var express = require('express');
var nodeFetch = require('node-fetch');
var connections = require('../lib/connections');
var auth = require('../lib/auth');
var AuthorizationError = require('../errors/AuthorizationError');

var router = express.Router();

module.exports = (requestReceived, settings, userId, clientId, authorization) => {
    if (settings.sendChat) {
        nodeFetch(`${process.env.TWITCH_API_BASE_URL}/extensions/${clientId}/${process.env.VERSION}/channels/${userId}/chat`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Client-ID': clientId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: `Thank you ${requestReceived.transaction.displayName} for requesting ${requestReceived.request.title} for ${requestReceived.transaction.product.cost.amount} ${requestReceived.transaction.product.cost.type} ${(requestReceived.message) ? 'Message: ' + requestReceived.message : ''}`
            })
        }).then((response, err) => {
            if (!response.ok || err) {
                throw err || response;
            }
        });
    }

    connections.getActiveByChannel(userId).forEach((ws)=> {
        ws.send(JSON.stringify({
            requestReceived,
        }));
    });
};
