const { Router } = require("express");

const router = Router();

/** Rutas del módulo de usuarios */
const usuariosRoutes = require("../routes/parameters/usuarios/usuarios.routes");
router.use("/parameters/usuarios", usuariosRoutes);
/** Rutas del módulo de solicitudes */
const solicitudesRoutes = require("../routes/parameters/solicitudes/solicitudes.routes");
router.use("/parameters/solicitudes", solicitudesRoutes);
/** Rutas del módulo de preguntas */
const preguntasRoutes = require("../routes/parameters/preguntas/preguntas.routes");
router.use("/parameters/preguntas", preguntasRoutes);
/** Rutas del módulo de reportes */
const reportesRoutes = require("../routes/parameters/reportes/reportes.routes");
router.use("/parameters/reportes", reportesRoutes);
/** Rutas del módulo de tipos de PQRS */
const typePqrsRoutes = require("../routes/parameters/type_pqrs/type_pqrs.routes");
router.use("/parameters/type_pqrs", typePqrsRoutes);

module.exports = router;
