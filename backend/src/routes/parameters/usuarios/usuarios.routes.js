const { Router } = require("express");
const router = Router();

const usuariosController = require("../../../controllers/parameters/usuarios/usuarios.controllers");

// Ruta para listar todos los usuarios
router.get('/', usuariosController.index);

// Ruta para obtener un usuario por ID
router.get('/:id', usuariosController.show);

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.create);

// Ruta para actualizar un usuario por ID
router.put('/:id', usuariosController.update);

// Ruta para eliminar o inactivar un usuario
router.delete('/:id', usuariosController.destroy);

module.exports = router;
