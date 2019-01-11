var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelize');

module.exports = sequelize.define('setting', {
    showImage: {
        type: Sequelize.BOOLEAN,
    },
    playSound: {
        type: Sequelize.BOOLEAN,
    },
    sendChat: {
        type: Sequelize.BOOLEAN,
    },
    profanityFilter: {
        type: Sequelize.BOOLEAN,
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'userId'
        }
    }
});
