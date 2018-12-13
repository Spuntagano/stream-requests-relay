var express = require('express');
var sequelize = require('../lib/sequelize');
var Setting = require('../models/Setting');
var User = require('../models/User');
var auth = require('../lib/auth');
var DatabaseError = require('../errors/DatabaseError');
var AuthorizationError = require('../errors/AuthorizationError');

var router = express.Router();

module.exports = router.get('/', async (req, res, next) => {
    let token, settings;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        await User.findOrCreate({ where: { userId: token.channel_id }, defaults: {
            userId: token.channel_id
        }});

        settings = await Setting.findOrCreate({ where: { userId: token.channel_id }, defaults: {
            showImage: true,
            playSound: true,
            sendChat: true
        }});
    } catch (e) {
        return next(new DatabaseError(e));
    }

    res.status(200).send({ settings: settings[0] });
});

router.post('/', async (req, res, next) => {
    let token, setting, settings = req.body.settings;

    try {
        token = await auth(req.headers.authorization);
    } catch(e) {
        return next(new AuthorizationError(e));
    }

    try {
        await User.findOrCreate({ where: { userId: token.user_id }, defaults: {
            userId: token.user_id
        }});

        setting = await Setting.findOrCreate({ where: { userId: token.user_id }, defaults: {
            showImage: settings.showImage,
            playSound: settings.playSound,
            sendChat: settings.sendChat,
            userId: token.user_id
        }});

        if (!setting[1]) {
            setting[0].update({
                showImage: settings.showImage,
                playSound: settings.playSound,
                sendChat: settings.sendChat
            });
        }
    } catch(e) {
        return next(new DatabaseError(e));
    }

    res.status(204).send();
});
