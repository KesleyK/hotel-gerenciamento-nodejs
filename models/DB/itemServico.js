const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const ItemServico = sequelize.define('itemServico', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = ItemServico;