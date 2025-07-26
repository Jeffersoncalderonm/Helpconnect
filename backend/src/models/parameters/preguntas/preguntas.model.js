const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // ajusta el path si es necesario

class Pregunta extends Model {}

Pregunta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pregunta: {
      type: DataTypes.TEXT,
      allowNull: true // es opcional si se permite crear registros sin pregunta
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Pregunta',
    tableName: 'preguntas',
    timestamps: false
  }
);

module.exports = Pregunta;
