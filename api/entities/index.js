const Router = require("express");

const {
    controllerGetAllEntities,
    controllerCreateEntities,
    //controllerUpdateEntities // Pendiente por implementar
} = require("./entities.controllers");

const router = Router();

router.get("/", controllerGetAllEntities);
router.post("/", controllerCreateEntities);
//router.put("/", controllerUpdateEntities); // Pendiente por implementar


module.exports = router;
