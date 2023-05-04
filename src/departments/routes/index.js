const express = require("express");
const router = express.Router();

const controller = require("../controller");

router.post("/add", controller.addDepartment);

router.get("/list", controller.getDepartments);

router.get("/:departmentId", controller.getDepartmentById);

router.put("/update/:departmentId", controller.updateDepartment);

router.delete("/delete/:departmentId", controller.deleteDepartment);

module.exports = router;
