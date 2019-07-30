const HotelModelPOO = require('../models/POO/hotel');
const QuartoModelPOO = require('../models/POO/quarto');
const ServicoModelPOO = require('../models/POO/servico');
const ItemServicoModelPOO = require('../models/POO/itemServico');

const ItemServicoModelDB = require('../models/DB/itemServico');

exports.getHotelCriacao = (req, res) => {
    res.render('admin/hotelCriacao', {
        pageTitle: 'Criação',
        path: '/admin/criacao'
    });
}

exports.postHotelCriacao = (req, res) => {
    const nome = req.body.nome;
    const localizacao = req.body.localizacao;
    const telefone = req.body.telefone;

    const hotel = new HotelModelPOO(nome, localizacao, telefone);
    hotel.criar(res);
}

exports.getHotelConfig = (req, res) => {
    res.render('admin/hotelConfig', {
        pageTitle: 'Configurações',
        path: '/admin/hotelConfig'
    });
}

exports.getAddQuarto = (req, res) => {
    res.render('admin/addQuarto', {
        pageTitle: 'Add Quarto',
        path: '/admin/addQuarto'
    });
}

exports.postAddQuarto = (req, res) => {
    const precoDiaria = req.body.precoDiaria;
    const numQuarto = req.body.numQuarto;

    const newQuarto = new QuartoModelPOO(numQuarto, precoDiaria);
    newQuarto.criarQuarto(req.hotel, res, newQuarto);
}

exports.getServico = (req, res) => {
    ServicoModelPOO
        .fetchAll(req.hotel, servicos => {
            res.render('admin/lista-servicos', {
                pageTitle: 'Serviços',   
                path: '/admin/servicos',
                servicos
            });
    });
}

exports.getAddServico = (req, res) => {
    res.render('admin/addServico', {
        pageTitle: 'Incluir Servico',
        path: '/admin/hotelConfig'        
    });
}

exports.postAddServico = (req, res) => {
    const nome = req.body.nome;

    const servico = new ServicoModelPOO(nome);
    servico.adicionarServico(req.hotel, servico => {
        res.redirect('/admin/hotelConfig');
    });
}

exports.getAddItemServico = (req, res) => {
    const itemServicoNome = req.params.itemServicoNome;

    res.render('admin/addItemServico', {
        pageTitle: itemServicoNome,
        path: '/admin/servicos',
        itemServicoNome
    });
}

exports.postAddItemServico = (req, res) => {
    const itemServicoNome = req.body.itemServicoNome;
    const nome = req.body.nome;
    const preco = req.body.preco;

    req.hotel
        .getServicos({ where: { nome: itemServicoNome } })
        .then(servico => {
            const itemServico = new ItemServicoModelPOO(nome, preco, itemServicoNome);
            itemServico.adicionarItemServico(res, itemServicoNome);
        })
        .catch(err => console.log(err));

}

exports.getItensServico = (req, res) => {
    const servicoNome = req.params.nomeServico;
    
    ItemServicoModelDB
        .findAll({ where: { servicoNome: servicoNome } })
        .then(itensServico => {
            res.render('admin/lista-itemServicos', {
                pageTitle: servicoNome,
                path: '/admin/servicos',
                servico: servicoNome,
                itensServico
            });
        })
        .catch(err => console.log(err));
}

exports.postItensServico = (req, res) => {
    const cpfHospede = req.body.cpfHospede;
    const servicoNome = req.params.nomeServico;
    const itemServicoId = req.body.itemServicoId;
    const itemServicoNome = req.params.itemServicoNome;
    const itemServicoPreco = Number.parseFloat(req.body.valorItemServico);

    ItemServicoModelPOO.adicionarItemGastoUsuario(cpfHospede, itemServicoPreco, hospedeAtualizado => {
        ItemServicoModelPOO.atualizarPedidoHospede(
            hospedeAtualizado,
            servicoNome,
            itemServicoId,
            itemServicoNome,
            res
        );
    });
}