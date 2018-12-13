var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelize');

module.exports = sequelize.define('request', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER
    },
    index: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'userId'
        }
    }
});
