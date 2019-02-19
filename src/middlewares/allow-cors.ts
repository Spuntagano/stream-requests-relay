var express = require('express');
var router = express.Router();

module.exports = router.use(function (req, res, next) {
    let origins = process.env.ORIGIN.split(',');
    let origin = origins[0];

    let index = origins.indexOf(req.headers.origin);
    if (index !== -1) {
        origin = origins[index];
    }

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ClientId, Authorization");
    next();
});
