require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./models/config/database');

require("./models/relations");

const routes = require('./routes/api.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api', routes);

// Iniciar el servidor
app.listen(process.env.PORT, () => {
  console.log("HelpConnect Support en el puerto:", process.env.PORT);

  sequelize.sync() // usa { force: false } para evitar perder datos
    .then(() => {
      console.log("Conectado a la base de datos correctamente");
    })
    .catch((error) => {
      console.log("Error conectando a la base de datos:", error);
    });
});





