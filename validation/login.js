const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let alerts = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    alerts.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    alerts.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    alerts.password = "Password field is required";
  }

  return {
    alerts,
    isValid: isEmpty(alerts)
  };
};
