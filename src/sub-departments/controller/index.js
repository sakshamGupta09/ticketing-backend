const ERROR_CODES = require("../../../constants/error-codes");
const STATUS_CODES = require("../../../constants/status-codes");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const getServerError = require("../../../utils/server-error");
const MESSAGES = require("../messages");
const service = require("../service");

exports.addSubDepartment = async (req, res, next) => {
  try {
    const { department_id, name } = req.body;
    const [result, fields] = await service.addSubDepartment(
      department_id,
      name
    );

    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.SUB_DEPARTMENT_ADDED,
      {
        insertId: result.insertId,
        affectedRows: result.affectedRows,
      }
    );

    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.ALREADY_EXISTS
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getSubDepartments = (req, res, next) => {};

exports.updateSubDepartment = async (req, res, next) => {
  try {
    const [result, fields] = await service.updateSubDepartment(
      req.params.subDepartmentId,
      req.body.name
    );

    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.SUB_DEPARTMENT_UPDATED,
      {
        affectedRows: result.affectedRows,
      }
    );

    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.ALREADY_EXISTS
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.deleteSubDepartment = (req, res, next) => {};
