const express = require('express');

const hotelController = require('../controllers/hotel');

const routes = express.Router();

routes.get('/', hotelController.getPaginaInicial);

routes.get('/quartos', hotelController.getQuartos);

routes.get('/quartos/:numQuarto', hotelController.getQuarto);

routes.get('/alugar-quarto/:numQuarto', hotelController.getAlugarQuarto);

routes.post('/alugar-quarto', hotelController.postAlugarQuarto);

routes.get('/usuario', hotelController.getUsuario);

routes.post('/dados-usuario', hotelController.postDadosUsuario);

routes.post('/quitar-gastoServico', hotelController.postQuitarGastosServico);

routes.post('/quitar-gastoHotel', hotelController.postQuitarGastosHotel);

module.exports = routes;