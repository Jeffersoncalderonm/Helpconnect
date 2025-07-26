const usuarios = require("../models/parameters/usuarios/usuarios.model");
const solicitudes = require("../models/parameters/solicitudes/solicitudes.model");
const preguntas = require("../models/parameters/preguntas/preguntas.model");
const reportes = require("../models/parameters/reportes/reportes.model");
const TypePqrs = require("../models/parameters/type_pqrs/type_pqrs.model");

solicitudes.belongsTo(usuarios, {
  foreignKey: "id_usuario",
  as: "creador"
});

solicitudes.belongsTo(usuarios, {
  foreignKey: "id_destinatario",
  as: "destinatario"
});

solicitudes.belongsTo(usuarios, {
  foreignKey: "user_creates_id",
  as: "creado_por"
});

solicitudes.belongsTo(usuarios, {
  foreignKey: "user_updates_id",
  as: "actualizado_por"
});
preguntas.belongsTo(usuarios, {
  foreignKey: "id_usuario",
  as: "autor"
});


usuarios.hasMany(preguntas, {
  foreignKey: "id_usuario",
  as: "preguntas_usuario"
});


reportes.belongsTo(usuarios, {
  foreignKey: "id_usuario",
  as: "autor"
});
module.exports = {
  usuarios,
  solicitudes,
  preguntas,
  reportes,
  TypePqrs
};