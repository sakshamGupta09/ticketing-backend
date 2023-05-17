const db = require("../../../database");

exports.findUserByEmail = (email) => {
  return db.execute(`SELECT id, email FROM users WHERE email = ?`, [email]);
};

exports.insertForgotPasswordEntry = (userId, hash) => {
  return db.execute(
    `INSERT INTO forgot_password(user_id, token) VALUES(?, ?)`,
    [userId, hash]
  );
};
