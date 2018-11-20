var config = require('./config');
var request = require('./request');

var user = sequelize.define('user', {
    twitchUsername: {
        type: Sequelize.STRING
    }
});

user.hasOne(config);
user.hasMany(request);
user.sync();

module.exports = user;