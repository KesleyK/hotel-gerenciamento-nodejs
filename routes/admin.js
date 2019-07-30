const express = require('express');

const adminControllers = require('../controllers/admin');

const routes = express.Router();

routes.get('/criacao', adminControllers.getHotelCriacao);

routes.post('/criacao', adminControllers.postHotelCriacao);

routes.get('/hotelConfig', adminControllers.getHotelConfig);

routes.get('/addQuarto', adminControllers.getAddQuarto);

routes.post('/addQuarto', adminControllers.postAddQuarto);

routes.get('/servicos', adminControllers.getServico);

routes.get('/addServico', adminControllers.getAddServico);

routes.post('/addServico', adminControllers.postAddServico);

routes.get('/addItemServico/:itemServicoNome', adminControllers.getAddItemServico);

routes.post('/addItemServico', adminControllers.postAddItemServico);

routes.get('/itensServico/:nomeServico', adminControllers.getItensServico);

routes.post('/itensServico/:nomeServico/:itemServicoNome', adminControllers.postItensServico);
        
module.exports = routes;