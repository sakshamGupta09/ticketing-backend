const service = require("../services");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const createUniqueHash = require("../../../utils/get-random-hash");
const Email = require("../../../utils/sendgrid");
const EMAIL_TEMPLATES = require("../../../constants/sendgrid/templates");
const FRONTEND_LINKS = require("../../../constants/frontend");
const { generateHash } = require("../../../utils/bcrypt");

exports.login = (req, res, next) => {};

exports.forgotPassword = async (req, res, next) => {
  try {
    const [rows, fields] = await service.findUserByEmail(req.body.email);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(404, "Email not found");
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const user = rows[0];
    const uuid = createUniqueHash();
    await service.insertForgotPasswordEntry(user.id, uuid);

    const emailObj = new Email(user.email, EMAIL_TEMPLATES.FORGOT_PASSWORD, {
      url: `${FRONTEND_LINKS.DOMAIN}/reset-password/${uuid}`,
    });
    await emailObj.sendEmail();

    const httpResponse = new HttpResponse(200, "Email sent");
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, "Internal server error");
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const [rows, fields] = await service.findUserToken(req.body.token);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(404, "Token not found");
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const row = rows[0];

    const expirationTime = new Date(row.created_at.getTime() + 5 * 60 * 1000);
    const currentTime = new Date();

    if (currentTime > expirationTime) {
      const errorResponse = new HttpErrorResponse(401, "Token expired");
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const password = req.body.password;
    const hashedPassword = await generateHash(password);
    await service.updateUserPassword(row.user_id, hashedPassword);

    const httpResponse = new HttpResponse(200, "Password updated");
    res.status(httpResponse.statusCode).send(httpResponse);

    await service.deleteUsedTokens(row.user_id);
  } catch (error) {
    console.error(error);
    const errorResponse = new HttpErrorResponse(500, "Internal server error");
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};
