const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); 

class Reporte extends Model {}

Reporte.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  },
  {
    sequelize,
    modelName: 'Reporte',
    tableName: 'reportes',
    timestamps: false
  }
);

module.exports = Reporte;
