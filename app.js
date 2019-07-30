const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

// <<Models DB>>
const HotelModelDB = require('./models/DB/hotel');
const QuartoModelDB = require('./models/DB/quarto');
const HospedeModelDB = require('./models/DB/hospede');
const ServicoModelDB = require('./models/DB/servico');
const ItemServicoModelDB = require('./models/DB/itemServico');
const PedidosModelDB = require('./models/DB/pedido');
const ItemPedidosModelDB = require('./models/DB/item-pedido');

// <<Routes>>
const hotelRoutes = require('./routes/hotel');
const adminRoutes = require('./routes/admin');

// <<Starting App>>
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// <<Calling the routes>>
app.use((req, res, next) => {
    HotelModelDB
        .findByPk(1)
        .then(hotel => {
            if(hotel){
                req.hotel = hotel;
            }
            next();
        })
        .catch(err => console.log(err));
});
app.use('/', hotelRoutes);
app.use('/admin', adminRoutes);

// <<Links>>
HotelModelDB.hasMany(QuartoModelDB);
QuartoModelDB.belongsTo(HotelModelDB);
QuartoModelDB.hasOne(HospedeModelDB);
HospedeModelDB.belongsTo(QuartoModelDB);
HotelModelDB.hasMany(ServicoModelDB);
ServicoModelDB.belongsTo(HotelModelDB);
ServicoModelDB.hasMany(ItemServicoModelDB);
HospedeModelDB.hasOne(PedidosModelDB);
PedidosModelDB.belongsTo(HospedeModelDB);
ItemServicoModelDB.belongsTo(ServicoModelDB);
ItemServicoModelDB.belongsToMany(PedidosModelDB, { through: ItemPedidosModelDB });
PedidosModelDB.belongsToMany(ItemServicoModelDB, { through: ItemPedidosModelDB });

// <<Starting DB & App>>
sequelize
    // .sync({ force: true })
    .sync()
    .then(conn => {
        app.listen(3001);
    })
    .catch(err => console.log(err));
