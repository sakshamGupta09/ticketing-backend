const { HttpErrorResponse } = require("../utils/http");
const MESSAGES = require("./messages");

function checkUserRole(roleId) {
  return function (req, res, next) {
    if (req.user.role_id !== roleId) {
      const errorResponse = new HttpErrorResponse(403, MESSAGES.NO_PERMISSION);
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    return next();
  };
}

module.exports = checkUserRole;
