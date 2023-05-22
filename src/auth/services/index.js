const db = require("../../../database");

exports.findUserByEmail = (email) => {
  return db.execute(
    `SELECT id, first_name, last_name, phone, role_id, email, password FROM users WHERE email = ?`,
    [email]
  );
};

exports.findUserToken = (token) => {
  return db.execute(
    `SELECT user_id, created_at FROM forgot_password WHERE token = ?`,
    [token]
  );
};

exports.insertForgotPasswordEntry = (userId, hash) => {
  return db.execute(
    `INSERT INTO forgot_password(user_id, token) VALUES(?, ?)`,
    [userId, hash]
  );
};

exports.updateUserPassword = (userId, password) => {
  return db.execute(`UPDATE users SET password = ? WHERE id = ?`, [
    password,
    userId,
  ]);
};

exports.deleteUsedTokens = (userId) => {
  return db.execute(`DELETE FROM forgot_password WHERE user_id = ?`, [userId]);
};
