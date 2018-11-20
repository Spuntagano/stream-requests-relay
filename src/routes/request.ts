var express = require('express');
var log = require('../utils/logger');
var sequelize = require('../utils/sequelize');
var request = require('../models/request');

var router = express.Router();

router.get('/', function (req, res) {

});

router.post('/', function (req, res) {
    var requests = req.body.requests;

    requests.forEach(function (request) {
        request.findOne({where: {user: auth}})({
            name: request.name,
            description: request.description,
            price: request.price,
            active: request.active,
            userId: 1
        });
    });
});

module.exports = router;
