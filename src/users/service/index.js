const db = require("../../../database");

exports.insertUser = (user) => {
  return db.execute(
    "INSERT INTO `ticketing`.`users` (`first_name`, `last_name`, `email`, `phone`, `role_id`) VALUES(?, ?, ?, ?, ?)",
    [user.first_name, user.last_name, user.email, user.phone, user.role_id]
  );
};

exports.userExists = (entityName, entityValue) => {
  return db.execute(
    `SELECT EXISTS(SELECT id FROM users WHERE ${entityName} = ?) AS can_use`,
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

exports.getUsers = ({ limit, offset }) => {
  const query = `SELECT id, first_name, last_name, email, phone, role_id, created_at, updated_at FROM ticketing.users ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const params = [limit, offset];
  return Promise.all([db.execute(query, params), getUsersCount()]);
};

const getUsersCount = () => {
  const query = `SELECT COUNT(id) AS count FROM ticketing.users`;
  return db.execute(query);
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
