const db = require("../../../database");

exports.insertUser = (user) => {
  return db.execute(
    `INSERT INTO users(first_name, last_name, email, phone, role_id) VALUES(?, ?, ?, ?, ?)`,
    [user.first_name, user.last_name, user.email, user.phone, user.role_id]
  );
};

exports.userExists = (entityName, entityValue) => {
  return db.execute(
    `SELECT COUNT(id) AS count FROM users WHERE ${entityName} = ?`,
    [entityValue]
  );
};

exports.updateUser = (user, userId) => {
  return db.execute(
    `UPDATE users SET first_name= ?, last_name= ?, email= ?, phone= ?, role_id= ? WHERE id = ?`,
    [
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.role_id,
      userId,
    ]
  );
};

exports.deleteUser = (userId) => {
  return db.execute(`DELETE FROM users WHERE id = ?`, [userId]);
};
