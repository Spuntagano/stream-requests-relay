var jwt = require('jsonwebtoken');

var auth = function(req) {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(req.headers.authorization.split('Bearer ')[1], Buffer.from(process.env.SECRET_KEY, 'base64'), {algorithms: 'HS256'}, (error, data) => {
                resolve(data);
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = auth;