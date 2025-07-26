const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Solicitud extends Model {}

Solicitud.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1 // 1 = activa, 0 = inactiva
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prioridad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_destinatario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ubicacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_creates_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_updates_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'solicitudes',
    timestamps: false
  }
);

module.exports = Solicitud;
