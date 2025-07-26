const sequelize = require('../../../models/config/database');
const Reporte = require('../../../models/parameters/reportes/reportes.model');
const Usuario = require('../../../models/parameters/usuarios/usuarios.model');

// Listar todos los reportes
const index = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = await Reporte.findAll({
      order: [["id", "DESC"]],
      transaction: t,
    });

    await t.commit();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No existen reportes registrados",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Reportes listados correctamente",
      data,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error listando los reportes: " + error.message,
      data: null,
    });
  }
};

// Mostrar un reporte por ID (si está activo)
const show = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const reporte = await Reporte.findOne({
      where: { id, estado: 1 },
      transaction: t,
    });

    if (!reporte) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un reporte activo con el id: ${id}`,
        data: null,
      });
    }

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Reporte recuperado correctamente",
      data: reporte,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error recuperando el reporte: " + error.message,
      data: null,
    });
  }
};

// Crear un nuevo reporte
const create = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id_usuario } = req.body;

    const existeUsuario = await Usuario.findByPk(id_usuario, { transaction: t });

    if (!existeUsuario) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: "El usuario no existe",
        data: null,
      });
    }

    const nuevo = await Reporte.create(req.body, { transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Reporte creado correctamente",
      data: nuevo,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error creando el reporte: " + error.message,
      data: null,
    });
  }
};

// Actualizar un reporte
const update = async (req, res) => {
  const { id } = req.params;

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: false,
      message: "El cuerpo del reporte está vacío o mal formado",
      data: null,
    });
  }

  const t = await sequelize.transaction();

  try {
    const reporte = await Reporte.findByPk(id, { transaction: t });

    if (!reporte) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un reporte con el id: ${id}`,
        data: null,
      });
    }

    // Validar usuario si se desea cambiar
    if (req.body.id_usuario) {
      const existeUsuario = await Usuario.findByPk(req.body.id_usuario, { transaction: t });
      if (!existeUsuario) {
        await t.rollback();
        return res.status(400).json({
          status: false,
          message: "El usuario indicado no existe",
          data: null,
        });
      }
    }

    req.body.fecha_actualizacion = new Date();

    await reporte.update(req.body, {
      transaction: t,
    });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Reporte actualizado correctamente",
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error actualizando el reporte: " + error.message,
      data: null,
    });
  }
};

// Eliminar lógicamente un reporte
const destroy = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const reporte = await Reporte.findByPk(id, { transaction: t });

    if (!reporte) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un reporte con el id: ${id}`,
        data: null,
      });
    }

    await reporte.update(
      { estado: 0 },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Reporte eliminado correctamente (inactivado)",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error eliminando el reporte: " + error.message,
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
