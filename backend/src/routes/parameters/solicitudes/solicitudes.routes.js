const { Router } = require("express");
const router = Router();

const solicitudesController = require("../../../controllers/parameters/solicitudes/solicitudes.controllers");

// Listar todas las solicitudes
router.get("/", solicitudesController.index);

// Obtener una solicitud por ID
router.get("/:id", solicitudesController.show);

// Crear una nueva solicitud
router.post("/", solicitudesController.create);

// Actualizar una solicitud por ID
router.put("/:id", solicitudesController.update);

// Eliminar (inactivar) una solicitud por ID
router.delete("/:id", solicitudesController.destroy);

module.exports = router;
