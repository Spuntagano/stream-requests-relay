var express = require('express');
var auth = require('../lib/auth');
var notify = require('../lib/notify');
var AuthorizationError = require('../errors/AuthorizationError');
var ApiError = require('../errors/ApiError');

var router = express.Router();

router.post('/', async (req, res, next) => {
    let token = req.body.requests;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        notify(req.body.requestReceived, req.body.requestReceived.settings, token.user_id, req.headers.clientid, req.headers.authorization);
    } catch(e) {
        return next(new ApiError(e))
    }

    res.status(204).send();
});

module.exports = router;
