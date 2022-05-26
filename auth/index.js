const Router = require("express");

const {
    authLogin
} = require("./auth.services");

const router = Router();

router.post("/login", authLogin);

module.exports = router;