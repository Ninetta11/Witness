const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let alerts = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.postcode = !isEmpty(data.postcode) ? data.postcode : "";
  data.suburb = !isEmpty(data.suburb) ? data.suburb : "";
  data.street = !isEmpty(data.street) ? data.street : "";
  data.street_no = !isEmpty(data.street_no) ? data.street_no : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Name checks
  if (Validator.isEmpty(data.first_name)) {
    alerts.first_name = "First Name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    alerts.last_name = "Last Name field is required";
  }

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

  if (!Validator.isLength(data.password, { min: 8 })) {
    alerts.password = "Password must be at least 8 characters";
  }

  // Address checks
  if (Validator.isEmpty(data.state)) {
    alerts.state = "State is required";
  }
  if (Validator.isEmpty(data.postcode)) {
    alerts.postcode = "Postcode is required";
  }
  if (Validator.isEmpty(data.suburb)) {
    alerts.suburb = "Suburb is required";
  }
  if (Validator.isEmpty(data.street)) {
    alerts.street = "Street is required";
  }
  if (Validator.isEmpty(data.street_no)) {
    alerts.street_no = "Street number is required";
  }

  // Occupation checks
  if (Validator.isEmpty(data.occupation)) {
    alerts.occupation = "Occupation is required";
  }

  return {
    alerts,
    isValid: isEmpty(alerts)
  };
};
