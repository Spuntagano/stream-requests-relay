var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelize');

module.exports = sequelize.define('product', {
    sku: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    index: {
        type: Sequelize.INTEGER
    },
}, {
    indexes: [{
        unique: true,
        fields: ['sku']
    }]
});
