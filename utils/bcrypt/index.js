const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 8;

exports.generateHash = (plainText) => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};

exports.verifyHash = (plainText, hashed) => {
  return bcrypt.compare(plainText, hashed);
};
