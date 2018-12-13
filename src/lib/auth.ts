var jwt = require('jsonwebtoken');

module.exports = (authorization) => {
    return new Promise((resolve, reject) => {
        jwt.verify(authorization.split('Bearer ')[1], Buffer.from(process.env.SECRET_KEY, 'base64'), {algorithms: 'HS256'}, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};
