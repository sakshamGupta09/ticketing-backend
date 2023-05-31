const { verifyToken } = require("../utils/jwt");
const { HttpErrorResponse } = require("../utils/http");
const MESSAGES = require("./messages");
const STATUS_CODES = require("../constants/status-codes");
const ERROR_CODES = require("../constants/error-codes");

async function verifyTokenMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.TOKEN_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const user = await verifyToken(token);
    req.user = user;
    return next();
  } catch (error) {
    if (
      error?.name &&
      [ERROR_CODES.TOKEN_EXPIRED, ERROR_CODES.INVALID_TOKEN].includes(
        error.name
      )
    ) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.TOKEN_EXPIRED
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = new HttpErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      MESSAGES.SERVER_ERROR
    );
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
}

module.exports = verifyTokenMiddleware;
