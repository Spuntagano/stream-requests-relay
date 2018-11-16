var express = require('express');
var jwt = require('jsonwebtoken');
var nodeFetch = require('node-fetch');
var connections = require('../websocket/request').connections;
var log = require('../utils/logger');

var router = express.Router();

router.post('/', function (req, res) {
    try {
        jwt.verify(req.headers.authorization.split('Bearer ')[1], Buffer.from(process.env.SECRET_KEY, 'base64'), {algorithms: 'HS256'}, (error, data) => {
            try {
                let requestReceived = req.body.requestReceived;
                if (requestReceived.notifications.sendChat) {
                    nodeFetch(`${process.env.TWITCH_API_BASE_URL}/extensions/${req.headers.clientid}/${requestReceived.version}/channels/${data.channel_id}/chat`, {
                        method: 'POST',
                        headers: {
                            Authorization: req.headers.authorization,
                            'Client-ID': req.headers.clientid,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text: `Thank you ${requestReceived.transaction.displayName} for requesting ${requestReceived.request.title} for ${requestReceived.transaction.product.cost.amount} ${requestReceived.transaction.product.cost.type}`
                        })
                    });
                }

                if (connections[data.user_id]) {
                    connections[data.user_id].forEach((ws, index) => {
                        if (ws.readyState === 3) {
                            connections[data.user_id].splice(index, 1);
                        } else {
                            ws.send(JSON.stringify(req.body));
                        }
                    });
                }

                res.status(200).send({success: true});
            } catch (e) {
                log(e.message);
                res.status(500).send({success: false});
            }
        });
    } catch (e) {
        log(e.message);
        res.status(403).send({success: false});
    }
});

module.exports = router;
