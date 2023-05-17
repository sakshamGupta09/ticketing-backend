const service = require("../services");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const createUniqueHash = require("../../../utils/get-random-hash");
const Email = require("../../../utils/sendgrid");
const EMAIL_TEMPLATES = require("../../../constants/sendgrid/templates");
const FRONTEND_LINKS = require("../../../constants/frontend");

exports.login = (req, res, next) => {};

exports.forgotPassword = async (req, res, next) => {
  try {
    const [rows, fields] = await service.findUserByEmail(req.body.email);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(404, "Email not found");
      return res.status(404).send(errorResponse);
    }
    const user = rows[0];
    const uuid = createUniqueHash();
    await service.insertForgotPasswordEntry(user.id, uuid);

    const emailObj = new Email(user.email, EMAIL_TEMPLATES.FORGOT_PASSWORD, {
      url: `${FRONTEND_LINKS.DOMAIN}/reset-password/${uuid}`,
    });
    await emailObj.sendEmail();

    const httpResponse = new HttpResponse(200, "Email sent");
    return res.status(200).send(httpResponse);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, "Internal server error");
    return res.status(500).send(errorResponse);
  }
};

exports.resetPassword = (req, res, next) => {};
