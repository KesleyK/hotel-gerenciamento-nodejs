const HospedeDB = require('../DB/hospede');
const ItemPedidoModelDB = require('../DB/item-pedido');

module.exports = class Hospede{
    constructor(cpf, nome, email, dataCheckin, dataCheckout){
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.dataCheckin = dataCheckin;
        this.dataCheckout = dataCheckout;
        this.gastoServico = 0;
    }

    cadastrarHospede(){
        HospedeDB
            .create(this)
            .catch(err => console.log(err));
    }

    static getDadosUsuario(cpf, cb){
        HospedeDB
            .findOne({ where: { cpf: cpf } })
            .then(usuario => {
                if(!usuario){
                    return cb(null);
                }
                return cb(usuario);
            })
            .catch(err => console.log(err));
    }
    
    static getTotalEstadia(hospedeDB, cb){
        hospedeDB
            .getQuarto()
            .then(quarto => {
                const hospedeCheckout = hospedeDB.dataCheckout;
                const hospedeCheckin = hospedeDB.dataCheckin;
                
                const diasHospedado = (hospedeCheckout - hospedeCheckin)/1000/60/60/24;
                const valorDiariaDoHospede = quarto.precoDiaria;
                
                const valorDiariaHospede = diasHospedado * valorDiariaDoHospede;
                cb(valorDiariaHospede);
            })
            .catch(err => console.log(err));
    }

    static quitarGastosServicos(usuario, res){
        usuario
            .update({ gastoServico: 0 })
            .then(usuario => {
                usuario
                    .getPedido()
                    .then(pedido => {
                        return ItemPedidoModelDB.destroy({ where: { pedidoId: pedido.id }});
                    })
                    .then(() => {
                        this.getTotalEstadia(usuario, valorTotalDiaria => {
                            res.render('hotel/areaUsuario', {
                                pageTitle: usuario.nome,
                                path: '/usuario',
                                usuario,
                                valorTotalDiaria,
                                itensServico: []
                            });
                        });
                    });
            })
            .catch(err => console.log(err));
    }

    static quitarGastosHotel(cpfUsuario, res){
        HospedeDB
            .findOne({ where: { cpf: cpfUsuario } })
            .then(usuario => {
                usuario
                    .getQuarto()
                    .then(quarto => {
                        quarto.update({ alugadoBool: false })
                        .then(() => {
                            usuario
                                .getPedido()
                                .then(pedido => {
                                    return pedido.destroy();
                                })
                                .then(() => {
                                    usuario
                                    .destroy()
                                    .then(() => {
                                        res.redirect('/usuario');
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
            })
            .catch(err => console.log(err));
    }
}