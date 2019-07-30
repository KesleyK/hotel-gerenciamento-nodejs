const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Pedido = sequelize.define('pedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Pedido;