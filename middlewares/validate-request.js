const { validationResult } = require("express-validator");
const { HttpErrorResponse } = require("../utils/http");

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const message = errors.array()[0].msg;
  const errorResponse = new HttpErrorResponse(422, message);
  return res.status(errorResponse.statusCode).send(errorResponse);
}

module.exports = validateRequest;
