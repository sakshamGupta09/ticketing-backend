const STATUS_CODES = require("../constants/status-codes");
const { HttpErrorResponse } = require("./http");

const serverErrorMessage = "Internal server error";

function getServerError() {
  const errorResponse = new HttpErrorResponse(
    STATUS_CODES.SERVER_ERROR,
    serverErrorMessage
  );

  return errorResponse;
}

module.exports = getServerError;
