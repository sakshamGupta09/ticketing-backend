const express = require("express");
const router = express.Router();

const controller = require("../controller");

router.post("/add", controller.addSubDepartment);

router.get("/list", controller.getSubDepartments);

router.get("/:subDepartmentId", controller.getSubDepartmentById);

router.get("/:departmentId", controller.getSubDepartmentsOfDepartment);

router.put("/update/:subDepartmentId", controller.updateSubDepartment);

router.delete("/delete/:subDepartmentId", controller.deleteSubDepartment);

module.exports = router;
