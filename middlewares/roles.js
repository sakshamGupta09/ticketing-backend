const STATUS_CODES = require("../constants/status-codes");
const { HttpErrorResponse } = require("../utils/http");
const MESSAGES = require("./messages");

function checkUserRole(roleId) {
  return function (req, res, next) {
    if (req.user.role_id !== roleId) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.FORBIDDEN,
        MESSAGES.NO_PERMISSION
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    return next();
  };
}

module.exports = checkUserRole;
