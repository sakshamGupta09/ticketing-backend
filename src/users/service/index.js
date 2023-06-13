const db = require("../../../database");

exports.insertUser = (user) => {
  return db.execute(
    "INSERT INTO `ticketing`.`users` (`first_name`, `last_name`, `email`, `phone`, `role_id`) VALUES(?, ?, ?, ?, ?)",
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

exports.getUsers = () => {
  const query = `SELECT id, first_name, last_name, email, phone, role_id FROM users`;
  const params = [];
  return db.execute(query, params);
};

exports.getUserById = (userId) => {
  return db.execute(
    `SELECT id, first_name, last_name, email, phone, role_id, created_at, updated_at FROM users WHERE id = ?`,
    [userId]
  );
};

exports.deleteUser = (userId) => {
  return db.execute(`DELETE FROM users WHERE id = ?`, [userId]);
};
