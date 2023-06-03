const service = require("../service");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const getDuplicateValue = require("../../../utils/sql-error");
const MESSAGES = require("../messages");
const STATUS_CODES = require("../../../constants/status-codes");
const ERROR_CODES = require("../../../constants/error-codes");
const getServerError = require("../../../utils/server-error");

exports.addUser = async (req, res, next) => {
  try {
    const [result, fields] = await service.insertUser(req.body.user);
    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.USER_ADDED,
      {
        user_id: result.insertId,
      }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const duplicateValue = getDuplicateValue(error.message);
      let errorMessage;
      if (duplicateValue === req.body.user.email) {
        errorMessage = MESSAGES.EMAIL_EXISTS;
      } else {
        errorMessage = MESSAGES.PHONE_EXISTS;
      }
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        errorMessage
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.userExists = async (req, res, next) => {
  try {
    const { entityName, entityValue } = req.query;
    const [result, fields] = await service.userExists(entityName, entityValue);
    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.SUCCESS,
      {
        exists: result[0].count > 0,
      }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const [rows, fields] = await service.getUsers();

    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.SUCCESS,
      { users: rows }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const [rows, fields] = await service.getUserById(req.params.userId);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.NOT_FOUND,
        MESSAGES.USER_ID_NOT_EXIST
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.SUCCESS,
      {
        user: rows[0],
      }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const [result, fields] = await service.updateUser(
      req.body.user,
      req.params.userId
    );
    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.USER_UPDATED,
      {}
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const duplicateValue = getDuplicateValue(error.message);
      let errorMessage;
      if (duplicateValue === req.body.user.email) {
        errorMessage = MESSAGES.EMAIL_EXISTS;
      } else {
        errorMessage = MESSAGES.PHONE_EXISTS;
      }
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        errorMessage
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const [result, fields] = await service.deleteUser(req.params.userId);
    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.DELETED,
      {}
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};
