const service = require("../services");
const { HttpResponse, HttpErrorResponse } = require("../../../utils/http");
const createUniqueHash = require("../../../utils/get-random-hash");
const Email = require("../../../utils/sendgrid");
const EMAIL_TEMPLATES = require("../../../constants/sendgrid/templates");
const FRONTEND_LINKS = require("../../../constants/frontend");
const { generateHash, verifyHash } = require("../../../utils/bcrypt");
const MESSAGES = require("../messages");
const {
  generateAuthToken,
  generateRefreshToken,
} = require("../../../utils/jwt");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows, fields] = await service.findUserByEmail(email);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(
        404,
        MESSAGES.EMAIL_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const user = rows[0];

    const isPasswordMatch = await verifyHash(password, user.password);
    if (!isPasswordMatch) {
      const errorResponse = new HttpErrorResponse(
        401,
        MESSAGES.INVALID_PASSWORD
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    const authToken = await generateAuthToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const httpResponse = new HttpResponse(200, MESSAGES.LOGIN_SUCCESSFUL, {
      authToken,
      refreshToken,
    });
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    console.error(error);
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const [rows, fields] = await service.findUserByEmail(req.body.email);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(
        404,
        MESSAGES.EMAIL_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    const user = rows[0];
    const uuid = createUniqueHash();
    await service.insertForgotPasswordEntry(user.id, uuid);

    const emailObj = new Email(user.email, EMAIL_TEMPLATES.FORGOT_PASSWORD, {
      url: `${FRONTEND_LINKS.DOMAIN}/reset-password/${uuid}`,
    });
    await emailObj.sendEmail();

    const httpResponse = new HttpResponse(200, MESSAGES.EMAIL_SENT);
    return res.status(httpResponse.statusCode).send(httpResponse);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const [rows, fields] = await service.findUserToken(req.body.token);
    if (rows.length === 0) {
      const errorResponse = new HttpErrorResponse(
        404,
        MESSAGES.TOKEN_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const row = rows[0];

    const expirationTime = new Date(row.created_at.getTime() + 5 * 60 * 1000);
    const currentTime = new Date();

    if (currentTime > expirationTime) {
      const errorResponse = new HttpErrorResponse(
        401,
        MESSAGES.TOKEN_NOT_FOUND
      );
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const password = req.body.password;
    const hashedPassword = await generateHash(password);
    await service.updateUserPassword(row.user_id, hashedPassword);

    const httpResponse = new HttpResponse(200, MESSAGES.PASSWORD_UPDATED);
    res.status(httpResponse.statusCode).send(httpResponse);

    await service.deleteUsedTokens(row.user_id);
  } catch (error) {
    const errorResponse = new HttpErrorResponse(500, MESSAGES.SERVER_ERROR);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};
