var user = require('./user');

var request = sequelize.define('request', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

request.belongsTo(user);
request.sync();

module.exports = request;