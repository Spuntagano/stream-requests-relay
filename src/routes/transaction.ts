var express = require('express');
var { CensorSensor } = require('censor-sensor');
var auth = require('../lib/auth');
var notify = require('../lib/notify');
var Transaction = require('../models/Transaction');
var Setting = require('../models/Setting');
var ApiError = require('../errors/ApiError');
var DatabaseError = require('../errors/DatabaseError');
var AuthorizationError = require('../errors/AuthorizationError');

var router = express.Router();

router.get('/', async (req, res, next) => {
    let token, transactions;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        transactions = await Transaction.findAll({
            where: {userId: token.user_id}, limit: 20, order: [['createdAt', 'DESC']]
        });
    } catch (e) {
        return next(new DatabaseError(e));
    }

    res.status(200).send({transactions})
});

router.post('/', async (req, res, next) => {
    let token, settings, requestReceived = req.body.requestReceived;
    let censor = new CensorSensor();
    censor.enableTier(1);

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        settings = await Setting.findOrCreate({ where: { userId: token.user_id }, defaults: {
            showImage: true,
            playSound: true,
            sendChat: true,
            profanityFilter: true,
            userId: token.user_id
        }});
    } catch(e) {
        return next(new DatabaseError(e));
    }

    requestReceived.message = requestReceived.message.substring(0,150);
    if (settings[0].profanityFilter) {
        requestReceived.message = censor.cleanProfanity(requestReceived.message);
    }

    try {
        await Transaction.create({
            transactionId: requestReceived.transaction.transactionId,
            message: requestReceived.message,
            price: requestReceived.transaction.product.cost.amount,
            title: requestReceived.request.title,
            displayName: requestReceived.transaction.displayName,
            userId: token.user_id
        });
    } catch(e) {
        return next(new DatabaseError(e));
    }

    try {
        await notify(requestReceived, settings[0], token.user_id, req.headers.clientid, req.headers.authorization);
    } catch(e) {
        return next(new ApiError(e));
    }

    res.status(204).send();
});

module.exports = router;
