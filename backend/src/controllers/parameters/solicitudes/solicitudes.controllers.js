const sequelize = require('../../../models/config/database');
const solicitudes = require('../../../models/parameters/solicitudes/solicitudes.model');
const { Op } = require('sequelize');

// Listar todas las solicitudes
const index = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = await solicitudes.findAll({
      order: [["id", "DESC"]],
      transaction: t,
    });

    await t.commit();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No existen solicitudes registradas",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Solicitudes listadas correctamente",
      data,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error listando las solicitudes: " + error.message,
      data: null,
    });
  }
};

// Mostrar una solicitud por ID (solo si está activa)
const show = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const solicitud = await solicitudes.findOne({
      where: { id, estado: 1 },
      transaction: t,
    });

    if (!solicitud) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una solicitud activa con el id: ${id}`,
        data: null,
      });
    }

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Solicitud recuperada correctamente",
      data: solicitud,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error recuperando la solicitud: " + error.message,
      data: null,
    });
  }
};

// Crear una nueva solicitud

const create = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      id_usuario,
      id_destinatario,
      user_creates_id,
    } = req.body;

    // Validar que los IDs referenciados existan en la tabla usuarios
    const usuariosModel = require('../../../models/parameters/usuarios/usuarios.model');
    const existeUsuario = await usuariosModel.findByPk(id_usuario, { transaction: t });
    const existeDestinatario = await usuariosModel.findByPk(id_destinatario, { transaction: t });
    const existeCreador = await usuariosModel.findByPk(user_creates_id, { transaction: t });

    if (!existeUsuario || !existeDestinatario || !existeCreador) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: "El usuario, destinatario o creador no existe",
        data: null,
      });
    }

    // Crear la solicitud
    const nueva = await solicitudes.create(req.body, { transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Solicitud creada correctamente",
      data: nueva,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error creando la solicitud: " + error.message,
      data: null,
    });
  }
};




// Actualizar una solicitud por ID
const update = async (req, res) => {
  const { id } = req.params;

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: false,
      message: "El cuerpo de la solicitud está vacío o mal formado",
      data: null,
    });
  }

  const t = await sequelize.transaction();

  try {
    const solicitud = await solicitudes.findByPk(id, { transaction: t });

    if (!solicitud) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una solicitud con el id: ${id}`,
        data: null,
      });
    }

    const {
      id_usuario,
      id_destinatario,
      user_updates_id
    } = req.body;

    // Validar que los IDs referenciados existan
    const usuariosModel = require('../../../models/parameters/usuarios/usuarios.model');

    const existeUsuario = await usuariosModel.findByPk(id_usuario, { transaction: t });
    const existeDestinatario = await usuariosModel.findByPk(id_destinatario, { transaction: t });
    const existeEditor = await usuariosModel.findByPk(user_updates_id, { transaction: t });

    if (!existeUsuario || !existeDestinatario || !existeEditor) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: "El usuario, destinatario o editor no existe",
        data: null,
      });
    }

    // Actualizar solicitud
    await solicitudes.update(req.body, {
      where: { id },
      transaction: t,
    });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Solicitud actualizada correctamente",
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error actualizando la solicitud: " + error.message,
      data: null,
    });
  }
};



// Eliminar lógicamente una solicitud (inactivar)
const destroy = async (req, res) => {
  const { id } = req.params;
  const { user_updates_id } = req.body;

  const t = await sequelize.transaction();

  try {
    const solicitud = await solicitudes.findByPk(id, { transaction: t });

    if (!solicitud) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una solicitud con el id: ${id}`,
        data: null,
      });
    }

    // Validar que el usuario editor exista
    const usuariosModel = require('../../../models/parameters/usuarios/usuarios.model');
    const editor = await usuariosModel.findByPk(user_updates_id, { transaction: t });

    if (!editor) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: "El usuario que edita (user_updates_id) no existe",
        data: null,
      });
    }

    // Inactivar la solicitud
    await solicitud.update(
      {
        estado: 0,
        user_updates_id
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Solicitud eliminada correctamente (inactivada)",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error eliminando la solicitud: " + error.message,
    });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
