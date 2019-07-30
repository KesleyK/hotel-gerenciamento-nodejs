const HotelDB = require('../DB/hotel');
const HospedeModelDB = require('../DB/hospede');

module.exports = class Hotel{
    constructor(nome, localizacao, telefone){
        this.nome = nome;
        this.localizacao = localizacao;
        this.telefone = telefone;
    }

    criar(res){
        HotelDB
            .create(this)
            .then(() => {
                res.redirect('/quartos');
            })
            .catch(err => console.log(err));
    }

    static getQuartos(hotel, res){
        hotel
            .getQuartos()
            .then(quartos => {
                res.render('hotel/quartos', {
                    pageTitle: 'Quartos',
                    quartos,
                    path: '/quartos'
                });
            })
            .catch(err => console.log(err));
    }

    static getQuarto(hotel, numQuarto, res){
        hotel
            .getQuartos({ where: { numQuarto: numQuarto } })
            .then(quarto => {
                HospedeModelDB
                    .findOne({ where: { 
                        quartoNumQuarto: numQuarto
                    } })
                    .then(hospede => {
                        res.render('hotel/quarto-detalhes', {
                            pageTitle: 'Detalhe',
                            quarto: quarto[0],
                            hospede,
                            path: '/quartos'
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
}