const express = require("express");

const router = express.Router();

const controller = require("../controller");

router.post("/login", controller.login);

router.post("/forgotPassword", controller.forgotPassword);

router.post("/resetPassword", controller.resetPassword);

module.exports = router;
