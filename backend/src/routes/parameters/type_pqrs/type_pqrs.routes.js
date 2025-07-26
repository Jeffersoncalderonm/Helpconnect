const { Router } = require("express");
const router = Router();

// Importación corregida: nombre correcto y singular
const typePqrsController = require("../../../controllers/parameters/type_pqrs/type_pqrs.controllers");

// Listar todos los tipos de PQRS
router.get('/', typePqrsController.index);

// Obtener un tipo de PQRS por ID
router.get('/:id', typePqrsController.show);

// Crear un nuevo tipo de PQRS
router.post('/', typePqrsController.create);

// Actualizar un tipo de PQRS por ID
router.put('/:id', typePqrsController.update);

// Eliminar lógicamente un tipo de PQRS
router.delete('/:id', typePqrsController.destroy);

module.exports = router;
