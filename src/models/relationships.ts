var User = require('../models/User');
var Config = require('../models/Setting');
// @ts-ignore
var Request = require('../models/Request');
var Product = require('../models/Product');
var Transaction = require('../models/Transaction');

(async () => {
    User.hasMany(Config, {foreignKey: 'userId', targetKey: 'userId'});
    User.hasMany(Request, {foreignKey: 'userId', targetKey: 'userId'});
    User.hasMany(Transaction, {foreignKey: 'userId', targetKey: 'userId'});
    await User.sync();

    await Product.sync();

    // @ts-ignore
    Request.belongsTo(User, {foreignKey: 'userId', targetKey: 'userId'});
    // @ts-ignore
    await Request.sync();

    Config.belongsTo(User, {foreignKey: 'userId', targetKey: 'userId'});
    await Config.sync();

    Transaction.belongsTo(User, {foreignKey: 'userId', targetKey: 'userId'});
    await Transaction.sync();
})();