const express = require("express");
const router = express.Router();
const controller = require("../controller");
const verifyTokenMiddleware = require("../../../middlewares/verify-token");
const checkUserRole = require("../../../middlewares/roles");
const ROLES = require("../../../constants/roles");
const { checkSchema } = require("express-validator");
const { addUserSchema, getUsersSchema } = require("../validations");
const validateRequest = require("../../../middlewares/validate-request");

router.post(
  "/add",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(addUserSchema, ["body"]),
  validateRequest,
  controller.addUser
);

router.get("/exists", verifyTokenMiddleware, controller.userExists);

router.get(
  "/list",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(getUsersSchema, ["query"]),
  validateRequest,
  controller.getUsers
);

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
  checkSchema(addUserSchema, ["body"]),
  validateRequest,
  controller.updateUser
);

router.delete(
  "/delete/:userId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.deleteUser
);

module.exports = router;
