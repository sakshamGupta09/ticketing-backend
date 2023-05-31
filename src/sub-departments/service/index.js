const db = require("../../../database");

exports.addSubDepartment = (departmentId, name) => {
  const query = `INSERT INTO sub_departments(department_id, name) VALUES(?, ?)`;
  const params = [departmentId, name];
  return db.execute(query, params);
};

exports.updateSubDepartment = (id, name) => {
  const query = `UPDATE sub_departments SET name = ? WHERE id = ?`;
  const params = [name, id];
  return db.execute(query, params);
};
