var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelize');

module.exports = sequelize.define('transaction', {
    price: {
        type: Sequelize.INTEGER
    },
    message: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    displayName: {
        type: Sequelize.STRING
    },
    transactionId: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'userId'
        }
    }
},{
    indexes: [{
        unique: true,
        fields: ['transactionId']
    }]
});
