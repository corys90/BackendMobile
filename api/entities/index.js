const Router = require("express");

const {
    controllerGetAllEntities,
    controllerCreateEntities
} = require("./entities.controllers");
const { isAuthenticated } = require("../../auth/auth.services");

const router = Router();

router.get("/", isAuthenticated(), controllerGetAllEntities);
router.post("/", isAuthenticated(), controllerCreateEntities);

module.exports = router;
