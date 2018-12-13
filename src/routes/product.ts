var express = require('express');
var sequelize = require('../lib/sequelize');
var Product = require('../models/Product');
var DatabaseError = require('../errors/DatabaseError');

var router = express.Router();

router.get('/', async (req, res, next) => {
    let products;

    try {
        products = await Product.findAll();
    } catch (e) {
        return next(new DatabaseError(e));
    }

    res.status(200).send({
        products: products.reduce((r, a) => {
            r[a.price] = r[a.price] || [];
            r[a.price].push(a);

            return r;
        }, {})
    });
});

module.exports = router;
