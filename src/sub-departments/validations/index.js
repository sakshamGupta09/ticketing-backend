exports.addSubdepartmentSchema = {
  department_id: {
    notEmpty: {
      errorMessage: "Department id is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Department id should be an integer",
      bail: true,
    },
  },
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
      bail: true,
    },
  },
};

exports.updateSubDepartmentSchema = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
      bail: true,
    },
  },
};
