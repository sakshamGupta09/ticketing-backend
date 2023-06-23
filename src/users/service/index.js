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

exports.getUsers = ({ limit, offset, search }) => {
  let query = `SELECT id, first_name, last_name, email, phone, role_id, created_at, updated_at FROM ticketing.users`;
  let countQuery = `SELECT COUNT(id) AS count FROM ticketing.users`;
  let params = [];

  if (search) {
    const pattern = `%${search}%`;
    const searchCondition = ` WHERE(first_name LIKE '${pattern}' OR last_name LIKE '${pattern}' OR email LIKE '${pattern}' OR phone LIKE '${pattern}')`;
    query += searchCondition;
    countQuery += searchCondition;
  }

  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return Promise.all([db.execute(query, params), getUsersCount(countQuery)]);
};

const getUsersCount = (query) => {
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
