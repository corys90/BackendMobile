const Router = require("express");
const { isAuthenticated } = require("../../auth/auth.services");

const {
    controllerGetLineState,
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace,
    controllerPutUpdateState
} = require("./line.controllers");

const router = Router();

router.get("/:id", isAuthenticated(), controllerGetLineState);
router.post("/", isAuthenticated(), controllerPostGetLinePlace);
router.patch("/", isAuthenticated(), controllerPatchCallLinePlace);
router.put("/state", isAuthenticated(), controllerPutUpdateState);


module.exports = router;