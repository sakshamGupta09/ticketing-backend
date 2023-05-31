const db = require("../../../database");

exports.addDepartment = (name) => {
  return db.execute(`INSERT INTO departments(name) VALUES(?)`, [name]);
};

exports.updateDepartment = (id, name) => {
  return db.execute(`UPDATE departments SET name = ? WHERE id = ?`, [name, id]);
};

exports.deleteDepartment = (id) => {
  return db.execute(`DELETE FROM departments WHERE id = ?`, [id]);
};

exports.getDepartments = () => {
  return db.execute(`SELECT id, name FROM departments`);
};

exports.getDepartmentById = (id) => {
  return db.execute(`SELECT id, name FROM departments WHERE id = ?`, [id]);
};
