var express = require('express');
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
            where: {userId: token.channel_id}, limit: 20, order: [['createdAt', 'DESC']]
        });
    } catch (e) {
        return next(new DatabaseError(e));
    }

    res.status(200).send({transactions})
});

router.post('/', async (req, res, next) => {
    let token, settings, requestReceived = req.body.requestReceived;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
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
        settings = await Setting.findOrCreate({ where: { userId: token.user_id }, defaults: {
            showImage: true,
            playSound: true,
            sendChat: true,
            userId: token.user_id
        }});
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
