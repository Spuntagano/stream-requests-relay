var express = require('express');
var sequelize = require('../lib/sequelize');
// @ts-ignore
var Request = require('../models/Request');
var User = require('../models/User');
var auth = require('../lib/auth');
var DatabaseError = require('../errors/DatabaseError');
var AuthorizationError = require('../errors/AuthorizationError');

var router = express.Router();

router.get('/', async (req, res, next) => {
    let token, requests;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        // @ts-ignore
        requests = await Request.findAll({ where: { userId: token.channel_id }});
    } catch (e) {
        return next(new DatabaseError(e));
    }

    res.status(200).send({
        requests: requests.reduce((r, a) => {
            r[a.price] = r[a.price] || [];
            r[a.price].push(a);
            return r;
        }, {})
    });
});

router.post('/', async (req, res, next) => {
    let token, requests = req.body.requests;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        await User.findOrCreate({ where: { userId: token.user_id }});

        Object.keys(requests).forEach((price) => {
            requests[price].forEach(async (r, index) => {
                // @ts-ignore
                let request = await Request.findOrCreate({
                    where: {
                        price: price,
                        index: index,
                        userId: token.user_id
                    },
                    defaults: {
                        title: r.title,
                        description: r.description,
                        active: r.active,
                        price: price,
                        index: index,
                        userId: token.user_id
                    }
                });

                if (!request[1]) {
                    request[0].update({
                        title: r.title,
                        description: r.description,
                        active: r.active,
                    })
                }
            });
        });
    } catch(e) {
        return next(new DatabaseError(e));
    }

    res.status(204).send();
});

module.exports = router;
