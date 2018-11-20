var product = sequelize.define('product', {
    SKU: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
});

product.sync();

module.exports = product;