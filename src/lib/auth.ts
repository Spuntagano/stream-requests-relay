var jwt = require('jsonwebtoken');

module.exports = (authorization) => {
    return new Promise((resolve, reject) => {
        let token = authorization;
        if (token.substring(0,6) === 'Bearer') {
            token = authorization.split('Bearer ')[1];
        }

        jwt.verify(token, Buffer.from(process.env.SECRET_KEY, 'base64'), {algorithms: 'HS256'}, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};
