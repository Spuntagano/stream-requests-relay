var express = require('express');
var jwt = require('jsonwebtoken');
var log = require('../utils/logger');

var router = express.Router();

router.post('/', function (req, res) {
    try {
        jwt.verify(req.headers.authorization.split('Bearer ')[1], Buffer.from(process.env.SECRET_KEY, 'base64'), {algorithms: 'HS256'}, (error, data) => {
            jwt.sign({exp: data.exp, channel_id: data.channel_id, ...req.body}, Buffer.from(process.env.PRIVATE_KEY, 'base64'), { algorithm: 'RS256' }, function(err, token) {
                res.status(200).send({success: true, token});
            });
        });
    } catch (e) {
        log(e.message);
        res.status(403).send({success: false});
    }
});

module.exports = router;
