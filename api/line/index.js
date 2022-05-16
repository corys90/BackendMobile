const Router = require("express");

const {
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace
} = require("./line.controllers");

const router = Router();

router.post("/", controllerPostGetLinePlace);
router.patch("/", controllerPatchCallLinePlace);


module.exports = router;