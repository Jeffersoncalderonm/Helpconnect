const { Router } = require("express");
const router = Router();

const preguntasController = require("../../../controllers/parameters/preguntas/preguntas.controller");

// Ruta para listar todas las preguntas
router.get('/', preguntasController.index);

// Ruta para obtener una pregunta por ID
router.get('/:id', preguntasController.show);

// Ruta para crear una nueva pregunta
router.post('/', preguntasController.create);

// Ruta para actualizar una pregunta por ID
router.put('/:id', preguntasController.update);

// Ruta para eliminar una pregunta por ID
router.delete('/:id', preguntasController.destroy);

module.exports = router;
