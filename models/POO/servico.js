const ServicoDB = require('../DB/servico');

module.exports = class Servico{
    constructor(nome){
        this.nome = nome;
    }

    adicionarServico(hotelDados, cb){
        hotelDados
            .createServico(this)
            .then(servico => {
                cb(servico)
            })
            .catch(err => console.log(err));
    }

    static fetchAll(hotelDados, cb){
        hotelDados
            .getServicos()
            .then(servicos => {
                cb(servicos);
            })
            .catch(err => console.log(err));
    }
}