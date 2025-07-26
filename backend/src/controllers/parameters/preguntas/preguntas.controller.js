const sequelize = require('../../../models/config/database');
const Preguntas = require('../../../models/parameters/preguntas/preguntas.model');
const Usuarios = require('../../../models/parameters/usuarios/usuarios.model');
const { Op } = require('sequelize');

// Listar todas las preguntas
const index = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const data = await Preguntas.findAll({
      order: [['id', 'DESC']],
      transaction: t,
    });

    await t.commit();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No existen preguntas registradas',
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Preguntas listadas correctamente',
      data,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: 'Error listando las preguntas: ' + error.message,
      data: null,
    });
  }
};

// Mostrar una pregunta por ID
const show = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const pregunta = await Preguntas.findByPk(id, { transaction: t });

    if (!pregunta) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una pregunta con el id: ${id}`,
        data: null,
      });
    }

    await t.commit();
    return res.status(200).json({
      status: true,
      message: 'Pregunta recuperada correctamente',
      data: pregunta,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: 'Error recuperando la pregunta: ' + error.message,
      data: null,
    });
  }
};

// Crear una nueva pregunta
const create = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { pregunta, respuesta, comentario, id_usuario } = req.body;

    // Validar que el usuario exista
    const usuario = await Usuarios.findByPk(id_usuario, { transaction: t });
    if (!usuario) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: 'El usuario no existe',
        data: null,
      });
    }

    // Crear la pregunta
    const nueva = await Preguntas.create(
      {
        pregunta,
        respuesta,
        comentario,
        id_usuario,
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: 'Pregunta creada correctamente',
      data: nueva,
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: 'Error creando la pregunta: ' + error.message,
      data: null,
    });
  }
};

// Actualizar una pregunta
const update = async (req, res) => {
  const { id } = req.params;
  const { pregunta, respuesta, comentario, id_usuario } = req.body;
  const t = await sequelize.transaction();

  try {
    const registro = await Preguntas.findByPk(id, { transaction: t });

    if (!registro) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una pregunta con el id: ${id}`,
        data: null,
      });
    }

    // Validar que el usuario exista (opcional)
    const usuario = await Usuarios.findByPk(id_usuario, { transaction: t });
    if (!usuario) {
      await t.rollback();
      return res.status(400).json({
        status: false,
        message: 'El usuario no existe',
        data: null,
      });
    }

    await registro.update(
      {
        pregunta,
        respuesta,
        comentario,
        id_usuario,
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: 'Pregunta actualizada correctamente',
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: 'Error actualizando la pregunta: ' + error.message,
      data: null,
    });
  }
};

// Eliminar pregunta (si deseas dejarlo como borrado lógico, puedes usar un campo `estado`)
const destroy = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const registro = await Preguntas.findByPk(id, { transaction: t });

    if (!registro) {
      await t.rollback();
      return res.status(404).json({
        status: false,
        message: `No existe una pregunta con el id: ${id}`,
      });
    }

    await registro.destroy({ transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: 'Pregunta eliminada correctamente',
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      status: false,
      message: 'Error eliminando la pregunta: ' + error.message,
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
