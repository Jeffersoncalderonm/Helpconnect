const sequelize = require('../../../models/config/database');
const TypePqrs = require('../../../models/parameters/type_pqrs/type_pqrs.model');
const { Op } = require('sequelize');

// Listar todos los tipos PQRS
const index = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const tipos = await TypePqrs.findAll({
      order: [['id', 'DESC']],
      transaction: t,
    });

    await t.commit();

    if (!tipos || tipos.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No existen tipos de PQRS registrados",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tipos de PQRS listados correctamente",
      data: tipos,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error listando tipos de PQRS: " + error.message,
      data: null,
    });
  }
};

// Mostrar un tipo por ID
const show = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const tipo = await TypePqrs.findByPk(id, { transaction: t });

    if (!tipo) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un tipo PQRS con el id: ${id}`,
        data: null,
      });
    }

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Tipo PQRS recuperado correctamente",
      data: tipo,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error recuperando tipo PQRS: " + error.message,
      data: null,
    });
  }
};

// Crear un nuevo tipo PQRS
const create = async (req, res) => {
  const t = await sequelize.transaction();
  const { nombre, tipo, descripcion } = req.body;

  try {
    const existe = await TypePqrs.findOne({
      where: { nombre },
      transaction: t,
    });

    if (existe) {
      await t.rollback();
      return res.status(409).json({
        status: false,
        message: "Ya existe un tipo PQRS con ese nombre",
        data: null,
      });
    }

    const nuevo = await TypePqrs.create(req.body, { transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Tipo PQRS creado correctamente",
      data: nuevo,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error creando tipo PQRS: " + error.message,
      data: null,
    });
  }
};

// Actualizar tipo PQRS
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
    const tipo = await TypePqrs.findByPk(id, { transaction: t });

    if (!tipo) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un tipo PQRS con el id: ${id}`,
        data: null,
      });
    }

    await TypePqrs.update(req.body, {
      where: { id },
      transaction: t,
    });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Tipo PQRS actualizado correctamente",
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error actualizando tipo PQRS: " + error.message,
      data: null,
    });
  }
};

// Eliminar lógicamente (inactivar) tipo PQRS
const destroy = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const tipo = await TypePqrs.findByPk(id, { transaction: t });

    if (!tipo) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe un tipo PQRS con el id: ${id}`,
        data: null,
      });
    }

    await tipo.update(
      {
        estado: 0,
        fecha_actualizacion: new Date()
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Tipo PQRS eliminado correctamente",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: "Error eliminando tipo PQRS: " + error.message,
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
