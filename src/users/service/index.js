const DATE_FILTER_MAP = require("../../../constants/date-filters-map");
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

exports.getUsers = ({ limit, offset, search, roleId, duration }) => {
  let query = `SELECT id, first_name, last_name, email, phone, role_id, created_at, updated_at FROM ticketing.users`;
  let params = [];

  let countQuery = `SELECT COUNT(id) AS count FROM ticketing.users`;
  let countParams = [];

  let filterApplied = false;

  if (search) {
    const pattern = `%${search}%`;
    const searchCondition = ` WHERE((first_name LIKE '${pattern}' OR last_name LIKE '${pattern}' OR email LIKE '${pattern}' OR phone LIKE '${pattern}')`;
    query += searchCondition;
    countQuery += searchCondition;
    filterApplied = true;
  }

  if (roleId) {
    params.push(roleId);
    countParams.push(roleId);

    let condition;

    if (filterApplied) {
      condition = ` AND (role_id = ?)`;
    } else {
      condition = ` WHERE((role_id = ?)`;
    }
    query += condition;
    countQuery += condition;
    filterApplied = true;
  }

  if (duration) {
    const days = DATE_FILTER_MAP[duration] || 0;
    params.push(days);
    countParams.push(days);

    let condition;
    if (filterApplied) {
      condition = ` AND DATEDIFF(NOW(), created_at) <= ?`;
    } else {
      condition = ` WHERE((DATEDIFF(NOW(), created_at) <= ?)`;
    }
    query += condition;
    countQuery += condition;
    filterApplied = true;
  }

  query += `) ORDER BY created_at DESC LIMIT ? OFFSET ?;`;
  countQuery += `);`;

  params.push(limit, offset);

  return Promise.all([
    db.execute(query, params),
    getUsersCount(countQuery, countParams),
  ]);
};

const getUsersCount = (query, params) => {
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
