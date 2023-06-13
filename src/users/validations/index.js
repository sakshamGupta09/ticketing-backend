exports.addUserSchema = {
  "user.first_name": {
    trim: true,
    notEmpty: {
      errorMessage: "First name is required",
      bail: true,
    },
    isLength: {
      errorMessage: "First name should contain atleast 3 characters",
      options: { min: 3 },
      bail: true,
    },
  },

  "user.last_name": {
    trim: true,
    notEmpty: {
      errorMessage: "Last name is required",
      bail: true,
    },
    isLength: {
      errorMessage: "Last name should contain atleast 3 characters",
      options: { min: 3 },
      bail: true,
    },
  },

  "user.email": {
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email format",
      bail: true,
    },
  },

  "user.phone": {
    trim: true,
    notEmpty: {
      errorMessage: "Phone number is required",
      bail: true,
    },
    isMobilePhone: {
      errorMessage: "Invalid phone number",
      bail: true,
    },
  },

  "user.role_id": {
    notEmpty: {
      errorMessage: "Role id is required",
      bail: true,
    },
    isInt: {
      errorMessage: "Role id should be an interger",
      bail: true,
    },
  },
};
