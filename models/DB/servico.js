const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Servico = sequelize.define('servico', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Servico;