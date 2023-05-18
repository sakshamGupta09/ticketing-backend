const jwt = require("jsonwebtoken");

exports.generateAuthToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SCRET,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      },
      function (err, token) {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};

exports.generateRefreshToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SCRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      },
      function (err, token) {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};
