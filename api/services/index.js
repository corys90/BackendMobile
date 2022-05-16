const Router = require("express");

const {
    controllerGetService,
    controllerCreateService,
    //controllerUpdateService // Pendiente por implementar
} = require("./services.controllers");

const router = Router();

router.get("/:idNit", controllerGetService);
router.post("/", controllerCreateService);
//router.put("/", controllerUpdateService); // Pendiente por implementar


module.exports = router;