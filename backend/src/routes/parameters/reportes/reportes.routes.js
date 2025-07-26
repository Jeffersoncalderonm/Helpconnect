const { Router } = require("express");
const router = Router();

const reportesController = require("../../../controllers/parameters/reportes/reportes.controllers");

// Ruta para listar todos los reportes
router.get('/', reportesController.index);

// Ruta para obtener un reporte por ID
router.get('/:id', reportesController.show);

// Ruta para crear un nuevo reporte
router.post('/', reportesController.create);

// Ruta para actualizar un reporte por ID
router.put('/:id', reportesController.update);

// Ruta para eliminar o inactivar un reporte
router.delete('/:id', reportesController.destroy);

module.exports = router;