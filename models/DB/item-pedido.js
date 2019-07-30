const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const ItemPedido = sequelize.define('itemPedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = ItemPedido;