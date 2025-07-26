const sequelize = require('../../../models/config/database');
const Usuarios = require('../../../models/parameters/usuarios/usuarios.model');
const { Op } = require('sequelize');

// Listar todos los usuarios
const index = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const usuarios = await Usuarios.findAll({
      order: [["id", "DESC"]],
      transaction: t,
    });

    await t.commit();

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No existen usuarios en la base de datos",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Usuarios listados correctamente",
      data: usuarios,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error recuperando los usuarios: " + error.message,
      data: null,
    });
  }
};

// Crear un nuevo usuario
const create = async (req, res) => {
  const t = await sequelize.transaction();
  const { email, nombre, contraseña, role_id, identificacion, telefono } = req.body;

  try {
    const existe = await Usuarios.findOne({
      where: {
        [Op.or]: [{ email: email }, { identificacion: identificacion }],
      },
      transaction: t,
    });

    if (existe) {
      await t.rollback();
      return res.status(409).json({
        status: false,
        message: "Ya existe un usuario con el mismo correo o identificación",
        data: null,
      });
    }

    req.body.user_creates_id = 1; // temporal hasta tener login

    const usuario = await Usuarios.create(req.body, { transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Usuario creado correctamente",
      data: usuario,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error creando el usuario: " + error.message,
      data: null,
    });
  }
};

// Mostrar un usuario por ID
const show = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const usuario = await Usuarios.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un usuario con el id: ${id}`,
        data: null,
      });
    }

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Usuario recuperado correctamente",
      data: usuario,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error recuperando el usuario: " + error.message,
      data: null,
    });
  }
};

// Actualizar un usuario por ID
const update = async (req, res) => {
  const { id } = req.params;

  // ✅ VALIDACIÓN SEGURA ANTES DE DESTRUCTURAR
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: false,
      message: "El cuerpo de la solicitud está vacío o mal formado",
      data: null,
    });
  }

  try {
    const { email, identificacion } = req.body;
    const t = await sequelize.transaction();

    const usuario = await Usuarios.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un usuario con el id: ${id}`,
        data: null,
      });
    }

    const conflicto = await Usuarios.findOne({
      where: {
        [Op.or]: [{ email: email }, { identificacion: identificacion }],
        id: { [Op.ne]: id },
      },
      transaction: t,
    });

    if (conflicto) {
      await t.rollback();
      return res.status(409).json({
        status: false,
        message: "Ya existe otro usuario con ese correo o identificación",
        data: null,
      });
    }

    req.body.user_updates_id = 1;

    await Usuarios.update(req.body, {
      where: { id: id },
      transaction: t,
    });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Usuario actualizado correctamente",
    });

  } catch (error) {
    console.error("Error actualizando:", error);
    return res.status(500).json({
      status: false,
      message: "Error actualizando el usuario: " + error.message,
      data: null,
    });
  }
};

// Eliminar lógicamente un usuario (o inactivarlo)
const destroy = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const usuario = await Usuarios.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un usuario con el id: ${id}`,
        data: null,
      });
    }

    await usuario.update(
      {
        is_active: false,
        user_updates_id: 1,
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error eliminando el usuario: " + error.message,
    });
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
