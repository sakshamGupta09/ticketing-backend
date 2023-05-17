const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 8;

exports.generateHash = function (plainText) {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};
