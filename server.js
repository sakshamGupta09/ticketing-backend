const express = require("express");
const bodyParser = require("body-parser");

//Routes
const departmentRoutes = require("./src/departments/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(departmentRoutes);

app.listen(3000);
