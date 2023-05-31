// Third party
const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

// Middlewares
const verifyTokenMiddleware = require("../../../middlewares/verify-token");
const checkUserRole = require("../../../middlewares/roles");
const validateRequest = require("../../../middlewares/validate-request");

// Controllers
const controller = require("../controller");

// Constants
const ROLES = require("../../../constants/roles");

// Schema
const {
  addSubdepartmentSchema,
  updateSubDepartmentSchema,
} = require("../validations");

router.post(
  "/add",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(addSubdepartmentSchema, ["body"]),
  validateRequest,
  controller.addSubDepartment
);

router.get("/list", controller.getSubDepartments);

router.put(
  "/update/:subDepartmentId",
  verifyTokenMiddleware,
  checkUserRole(ROLES.ADMIN),
  checkSchema(updateSubDepartmentSchema, ["body"]),
  validateRequest,
  controller.updateSubDepartment
);

router.delete("/delete/:subDepartmentId", controller.deleteSubDepartment);

module.exports = router;
