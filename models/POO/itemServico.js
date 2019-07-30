const ItemServicoModelDB = require('../DB/itemServico');
const HospedeModelDB = require('../DB/hospede');

module.exports = class ItemServico{
    constructor(nome, preco, servicoNome){
        this.nome = nome;
        this.preco = preco;
        this.servicoNome = servicoNome;
    }

    adicionarItemServico(res, itemServicoNome){
        ItemServicoModelDB
                .create(this)
                .then(itemServico => {
                    res.redirect('/admin/itensServico/' + itemServicoNome);
                })
                .catch(err => console.log(err));
    }

    static adicionarItemGastoUsuario(cpfHospede, itemServicoPreco, cb){
        HospedeModelDB
        .findOne({ where: { cpf: cpfHospede } })
        .then(hospede => {
            const atualGastoServico = +hospede.gastoServico;
            hospede
                .update({ gastoServico: atualGastoServico + itemServicoPreco })
                .then(hospedeAtualizado => {
                    cb(hospedeAtualizado);
                })
                .catch(err => console.log(err));
            })
        .catch(err => console.log(err));
    }

    static atualizarPedidoHospede(hospedeAtualizado, servicoNome, itemServicoId, itemServicoNome, res){
        let pedidoAtualizado;
        let novaQuantidade = 1;

        hospedeAtualizado
            .getPedido()
            .then(pedido => {
                pedidoAtualizado = pedido;
                return pedido.getItemServicos({ where: {id: itemServicoId} });
            })
            .then(itemServicos => {
                let item;
                
                if(itemServicos.length > 0){
                    item = itemServicos[0];
                }

                if(item){
                    const antigaQuantidade = item.itemPedido.quantity;
                    novaQuantidade += antigaQuantidade;

                    return item;
                }

                return ItemServicoModelDB.findOne({ where: {nome: itemServicoNome} });
            })
            .then(item => {
                return pedidoAtualizado.addItemServico(item, { 
                    through: {quantity: novaQuantidade} 
                });
            })
            .then(pedido => {
                res.redirect('/admin/itensServico/' + servicoNome);
            })
            .catch(err => console.log(err));
    }
}