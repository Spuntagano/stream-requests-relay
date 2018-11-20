var user = require('./user');

var config = sequelize.define('config', {
    showImage: {
        type: Sequelize.BOOLEAN
    },
    playSound: {
        type: Sequelize.BOOLEAN
    },
    sendChat: {
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

config.belongsTo(user);
config.sync();

exports.module = config;