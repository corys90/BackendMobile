const Router = require("express");
const { isAuthenticated } = require("../../auth/auth.services");

const {
    controllerGetService,
    controllerCreateService,
} = require("./services.controllers");

const router = Router();

router.get("/:idNit", isAuthenticated(), controllerGetService);
router.post("/", isAuthenticated(), controllerCreateService);

module.exports = router;