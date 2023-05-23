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

router.get("/exists", verifyTokenMiddleware, controller.userExists);

router.get("/list", controller.getUsers);

router.get(
  "/:userId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.getUserById
);

router.put(
  "/update/:userId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.updateUser
);

router.delete(
  "/delete/:userId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.deleteUser
);

module.exports = router;
