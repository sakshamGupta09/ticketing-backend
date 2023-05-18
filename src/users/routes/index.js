const express = require("express");

const router = express.Router();
const controller = require("../controller");

const verifyTokenMiddleware = require("../../../middlewares/verify-token");
const checkUserRole = require("../../../middlewares/roles");
const ROLES = require("../../../constants/roles");

router.post(
  "/add",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.addUser
);

router.get("/list", controller.getUsers);

router.get("/:userId", controller.getUserById);

router.put("/update/:userId", controller.updateUser);

router.delete("/delete/:userId", controller.deleteUser);

module.exports = router;
