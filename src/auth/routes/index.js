const express = require("express");
const router = express.Router();
const controller = require("../controller");
const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations");
const { checkSchema } = require("express-validator");
const validateRequest = require("../../../middlewares/validate-request");

router.post(
  "/login",
  checkSchema(loginSchema),
  validateRequest,
  controller.login
);

router.post(
  "/forgotPassword",
  checkSchema(forgotPasswordSchema),
  validateRequest,
  controller.forgotPassword
);

router.post(
  "/resetPassword",
  checkSchema(resetPasswordSchema),
  validateRequest,
  controller.resetPassword
);

module.exports = router;
