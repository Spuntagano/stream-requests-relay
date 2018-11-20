var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.MYSQL_DATABASE_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// user.create({
//     twitchUsername: 'bob'
// });
//
// config.create({
//     showImage: true,
//     playSound: true,
//     sendChat: true,
//     userId: 1
// });
//
// request.create({
//     name: 'name',
//     description: 'desc',
//     price: 100,
//     active: true,
//     userId: 1
// });

module.exports = sequelize;
