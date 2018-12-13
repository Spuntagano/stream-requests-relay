var express = require('express');
var nodeFetch = require('node-fetch');
var jwt = require('jsonwebtoken');
var auth = require('../lib/auth');
var AuthorizationError = require('../errors/AuthorizationError');
var ApiError = require('../errors/ApiError');

var router = express.Router();

router.post('/', async (req, res, next) => {
    let token;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    token.pubsub_perms.send = ['broadcast'];

    try {
        await nodeFetch(`${process.env.TWITCH_API_BASE_URL}/extensions/message/${token.channel_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt.sign(token, Buffer.from(process.env.SECRET_KEY, 'base64'))}`,
                'Client-ID': req.headers.clientid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content_type: 'application/json',
                targets: ['broadcast'],
                message: JSON.stringify({
                    transactionId: req.body.transactionId,
                    message: req.body.message
                })
            })
        }).then((response, err) => {
            if (!response.ok || err) {
                throw err || response;
            }
        });
    } catch (e) {
        return next(new ApiError(e));
    }

    res.status(204).send();
});

module.exports = router;
