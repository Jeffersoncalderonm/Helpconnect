const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class TypePqrs extends Model {}

TypePqrs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(10),
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
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1 // ✅ Valor por defecto
    }
  },
  {
    sequelize,
    modelName: 'TypePqrs',
    tableName: 'type_pqrs',
    timestamps: false
  }
);

module.exports = TypePqrs;
