const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

// Controller
const controller = require("../controller");

// Middlewares
const verifyTokenMiddleware = require("../../../middlewares/verify-token");
const checkUserRole = require("../../../middlewares/roles");
const validateRequest = require("../../../middlewares/validate-request");

// Constants
const ROLES = require("../../../constants/roles");
const { addDepartmentSchema } = require("../validations");

router.post(
  "/add",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(addDepartmentSchema, ["body"]),
  validateRequest,
  controller.addDepartment
);

router.get("/list", verifyTokenMiddleware, controller.getDepartments);

router.get(
  "/:departmentId",
  verifyTokenMiddleware,
  controller.getDepartmentById
);

router.put(
  "/update/:departmentId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(addDepartmentSchema),
  validateRequest,
  controller.updateDepartment
);

router.delete(
  "/delete/:departmentId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  controller.deleteDepartment
);

module.exports = router;
