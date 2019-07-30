const QuartoDB = require('../DB/quarto');

module.exports = class Quarto{
    constructor(numQuarto, precoDiaria){
        this.numQuarto = numQuarto
        this.precoDiaria = precoDiaria;
        this.alugadoBool = false;
    }

    criarQuarto(hotel, res, newQuarto){
        hotel
            .createQuarto(newQuarto)
            .then(() => {
                res.redirect('/admin/addQuarto')
            })
            .catch(err => console.log(err));
    }

    static getQuarto(numQuarto, cb){
        QuartoDB
            .findOne({ where: { numQuarto: numQuarto } })
            .then(quarto => {
                cb(quarto);
            })
            .catch(err => console.log(err));
    }

    static alugarQuarto(numQuarto, hospede, cb){
        this.getQuarto(numQuarto, quarto => {
            quarto
                .createHospede(hospede)
                .then((hospede) => {
                    hospede
                        .createPedido()
                        .then(() => {
                            quarto
                                .update({ alugadoBool: 1 })
                                .then(quarto => {
                                    cb(quarto)
                                })
                                .catch(err => console.log(err));
                        });
                })
                .catch(err => console.log(err));
        });
    }
}