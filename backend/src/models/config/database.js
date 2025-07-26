const { Sequelize } = require('sequelize');

const conexion = new Sequelize(
  process.env.DB_NAME,            // nombre de la base de datos
  process.env.DB_USER,            // usuario de la base de datos
  process.env.DB_PASSWORD,        // Password de la base de datos
  {
      host: process.env.DB_HOST,  // Servidor de la base de datos
      dialect: 'mysql',          // Tipo de motor base de datos
  }   
);

module.exports = conexion ;