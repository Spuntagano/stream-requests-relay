var express = require('express');
var router = express.Router();

module.exports = router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ClientId, Authorization");
    next();
});
