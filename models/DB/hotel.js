const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Hotel = sequelize.define('hotel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    localizacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Hotel;