const { validationResult } = require("express-validator");
const { HttpErrorResponse } = require("../utils/http");
const STATUS_CODES = require("../constants/status-codes");

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const message = errors.array()[0].msg;
  const errorResponse = new HttpErrorResponse(
    STATUS_CODES.BAD_REQUEST,
    message
  );
  return res.status(errorResponse.statusCode).send(errorResponse);
}

module.exports = validateRequest;
