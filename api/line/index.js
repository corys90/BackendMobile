const Router = require("express");

const {
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace,
    controllerPutUpdateState
} = require("./line.controllers");

const router = Router();

router.post("/", controllerPostGetLinePlace);
router.patch("/", controllerPatchCallLinePlace);
router.put("/state", controllerPutUpdateState);


module.exports = router;