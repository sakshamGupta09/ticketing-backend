require("dotenv").config();

const express = require("express");

//Routes
const userRoutes = require("./src/users/routes");
const departmentRoutes = require("./src/departments/routes");
const subDepartmentRoutes = require("./src/sub-departments/routes");
const adminAuthRoutes = require("./src/auth/routes");
const allowCORS = require("./middlewares/cors");

const app = express();

app.use(express.json());
app.use(allowCORS);

app.use("/user", userRoutes);
app.use("/department", departmentRoutes);
app.use("/subDepartment", subDepartmentRoutes);
app.use("/auth", adminAuthRoutes);

app.listen(process.env.PORT);
