const express = require("express");
const bodyParser = require("body-parser");

//Routes
const userRoutes = require("./src/users/routes");
const departmentRoutes = require("./src/departments/routes");
const subDepartmentRoutes = require("./src/sub-departments/routes");
const adminAuthRoutes = require("./src/admin-auth/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/department", departmentRoutes);
app.use("/subDepartment", subDepartmentRoutes);
app.use("/admin", adminAuthRoutes);

app.listen(3000);
