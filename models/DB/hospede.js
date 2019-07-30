const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Hospede = sequelize.define('hospede', {
    cpf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gastoServico: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dataCheckin: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataCheckout: Sequelize.DATE
});

module.exports = Hospede;