const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Quarto = sequelize.define('quarto', {
    numQuarto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    precoDiaria: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    alugadoBool: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Quarto;