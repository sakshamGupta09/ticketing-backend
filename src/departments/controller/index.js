const ERROR_CODES = require("../../../constants/error-codes");
const STATUS_CODES = require("../../../constants/status-codes");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const getServerError = require("../../../utils/server-error");
const MESSAGES = require("../messages");
const service = require("../service");

exports.addDepartment = async (req, res, next) => {
  try {
    const departmentName = req.body.name;
    const [result, fields] = await service.addDepartment(departmentName);
    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.DEPARTMENT_CREATED,
      {
        department_id: result.insertId,
      }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.DEPARTMENT_EXISTS
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const [rows, fields] = await service.getDepartments();

    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.SUCCESS,
      { departments: rows }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const [rows, fields] = await service.getDepartmentById(
      req.params.departmentId
    );
    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.SUCCESS,
      {
        department: rows[0],
      }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const [result, fields] = await service.updateDepartment(
      req.params.departmentId,
      req.body.name
    );
    const httpResponse = new HttpResponse(
      STATUS_CODES.RESOURCE_CREATED,
      MESSAGES.DEPARTMENT_UPDATED,
      { affectedRows: result.affectedRows }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    if (error?.code === ERROR_CODES.DUPLICATE_ENTRY) {
      const errorResponse = new HttpErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.DEPARTMENT_EXISTS
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const [result, fields] = await service.deleteDepartment(
      req.params.departmentId
    );
    const httpResponse = new HttpResponse(
      STATUS_CODES.SUCCESS,
      MESSAGES.DEPARTMENT_DELETED,
      { affectedRows: result.affectedRows }
    );
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = getServerError();
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};
