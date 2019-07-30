const HotelModelDB = require('../models/DB/hotel');
const QuartoModelDB = require('../models/DB/quarto');
const HospedeModelDB = require('../models/DB/hospede');

const HotelModelPOO = require('../models/POO/hotel');
const HospedeModelPOO = require('../models/POO/hospede');
const QuartoModelPOO = require('../models/POO/quarto');

exports.getPaginaInicial = (req, res) => {
    HotelModelDB
        .findByPk(1)
        .then(hotel => {
            if(!hotel){
                return res.redirect('/admin/criacao');
            }
            res.redirect('/quartos');
        })
        .catch(err => console.log(err));
}

exports.getQuartos = (req, res) => {
    const hotel = req.hotel;

    HotelModelPOO.getQuartos(hotel, res);
}

exports.getQuarto = (req, res) => {
    const hotel = req.hotel;
    const numQuarto = req.params.numQuarto
    
    HotelModelPOO.getQuarto(hotel, numQuarto, res);
}

exports.getAlugarQuarto = (req, res) => {
    const numQuarto = req.params.numQuarto;

    QuartoModelDB
            .findOne({ where: { numQuarto: numQuarto } })
            .then(quarto => {
                res.render('hotel/alugarQuarto', {
                    quarto,
                    pageTitle: 'Alugar',
                    path: '/quartos'
                });
            })
            .catch(err => console.log(err));
}

exports.postAlugarQuarto = (req, res) => {
    const numQuarto = req.body.numQuarto;

    // <<Dados Hóspede>>
    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const email = req.body.email;
    const dataCheckin = req.body.dataCheckin;
    const dataCheckout = req.body.dataCheckout;

    const hospede = new HospedeModelPOO(cpf, nome, email, dataCheckin, dataCheckout);

    QuartoModelPOO.alugarQuarto(numQuarto, hospede, quarto => {
        res.redirect('/');
    });
}

exports.getUsuario = (req, res) => {
    res.render('hotel/usuario', {
        pageTitle: 'Usuário',
        path: '/usuario'
    });
}

exports.postDadosUsuario = (req, res) => {
    const usuarioCpf = req.body.cpf;

    HospedeModelPOO.getDadosUsuario(usuarioCpf, usuario => {
        if(usuario){
            usuario
                .getPedido()
                .then(pedido => {
                    pedido
                        .getItemServicos()
                        .then(itensServico => {
                            usuario
                                .getQuarto()
                                .then(quarto => {
                                    HospedeModelPOO.getTotalEstadia(usuario, valorTotalDiaria => {
                                        res.render('hotel/areaUsuario.ejs', {
                                            pageTitle: usuario.nome,
                                            path: '/usuario',
                                            usuario,
                                            quarto,
                                            itensServico,
                                            valorTotalDiaria
                                        });
                                    });
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
        else{
            res.render('hotel/areaUsuario.ejs', {
                pageTitle: 'Usuário Não Encontrado',
                path: '/usuario',
                usuario: null,
                valorTotalDiaria: 0,
                itensServico: []
            });
        }
    });
}

exports.postQuitarGastosServico = (req, res) => {
    const cpfUsuario = req.body.cpfUsuario;

    HospedeModelDB
        .findOne({ where: {cpf: cpfUsuario} })
        .then(usuario => {
            HospedeModelPOO.quitarGastosServicos(usuario, res);
        })
        .catch(err => console.log(err));
}

exports.postQuitarGastosHotel = (req, res) => {
    const cpfUsuario = req.body.cpfUsuario;

    HospedeModelPOO.quitarGastosHotel(cpfUsuario, res);
}