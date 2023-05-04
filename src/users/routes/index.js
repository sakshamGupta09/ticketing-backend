const express = require("express");

const router = express.Router();
const controller = require("../controller");

router.post("/add", controller.addUser);

router.get("/list", controller.getUsers);

router.get("/:userId", controller.getUserById);

router.put("/update/:userId", controller.updateUser);

router.delete("/delete/:userId", controller.deleteUser);

module.exports = router;
