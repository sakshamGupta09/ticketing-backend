exports.loginSchema = {
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email",
      bail: true,
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
  },
};

exports.forgotPasswordSchema = {
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email",
      bail: true,
    },
  },
};

exports.resetPasswordSchema = {
  token: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Token is required",
      bail: true,
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "Password is too weak",
      bail: true,
    },
  },
};
