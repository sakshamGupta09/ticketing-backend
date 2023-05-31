exports.addDepartmentSchema = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
      bail: true,
    },
  },
};
