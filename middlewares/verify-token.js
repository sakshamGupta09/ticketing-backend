const { verifyToken } = require("../utils/jwt");
const { HttpResponse, HttpErrorResponse } = require("../utils/http");
const MESSAGES = require("./messages");

async function verifyTokenMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const errorResponse = new HttpErrorResponse(
        403,
        MESSAGES.TOKEN_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const user = await verifyToken(token);
    req.user = user;
    return next();
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      const errorResponse = new HttpErrorResponse(401, MESSAGES.TOKEN_EXPIRED);
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
}

module.exports = verifyTokenMiddleware;
