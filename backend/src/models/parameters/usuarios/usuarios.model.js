const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // conexión correctamente importada

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    identificacion: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    
  },
  {
    sequelize, 
    modelName: 'Usuario', 
    tableName: 'usuarios',
    timestamps: false
  }
);

module.exports = Usuario;

