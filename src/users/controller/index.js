const service = require("../service");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const getDuplicateValue = require("../../../utils/sql-error");
const MESSAGES = require("../messages");

exports.addUser = async (req, res, next) => {
  try {
    const [result, fields] = await service.insertUser(req.body.user);
    const httpResponse = new HttpResponse(201, MESSAGES.USER_ADDED, {
      user_id: result.insertId,
    });
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      const duplicateValue = getDuplicateValue(error.message);
      let errorMessage;
      if (duplicateValue === req.body.user.email) {
        errorMessage = MESSAGES.EMAIL_EXISTS;
      } else {
        errorMessage = MESSAGES.PHONE_EXISTS;
      }
      const errorResponse = new HttpErrorResponse(400, errorMessage);
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.userExists = async (req, res, next) => {
  try {
    const { entityName, entityValue } = req.query;
    const [result, fields] = await service.userExists(entityName, entityValue);
    const httpResponse = new HttpResponse(200, MESSAGES.SUCCESS, {
      exists: result[0].count > 0,
    });
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getUsers = (req, res, next) => {};

exports.getUserById = (req, res, next) => {};

exports.updateUser = (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {
  try {
    const [result, fields] = await service.deleteUser(req.params.userId);
    const httpResponse = new HttpResponse(200, MESSAGES.DELETED, {});
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};
