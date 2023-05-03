const express = require("express");
const router = express.Router();

const departmentController = require("../controller");

router.get("/list", departmentController.getDepartments);

router.post("/create", departmentController.addDepartment);

router.put("/update", departmentController.updateDepartment);

router.delete("/delete", departmentController.deleteDepartment);

module.exports = router;
