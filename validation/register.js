const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

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
  // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First Name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // if (Validator.isEmpty(data.password)) {
  //   errors.password = "Confirm password field is required";
  // }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // if (!Validator.equals(data.password, data.password2)) {
  //   errors.password2 = "Passwords must match";
  // }

  // Address checks
  if (Validator.isEmpty(data.state)) {
    errors.state = "State is required";
  }
  if (Validator.isEmpty(data.postcode)) {
    errors.postcode = "Postcode is required";
  }
  if (Validator.isEmpty(data.suburb)) {
    errors.suburb = "Suburb is required";
  }
  if (Validator.isEmpty(data.street)) {
    errors.street = "Street is required";
  }
  if (Validator.isEmpty(data.street_no)) {
    errors.street_no = "Street number is required";
  }

  // Occupation checks
  if (Validator.isEmpty(data.occupation)) {
    errors.occupation = "Occupation is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
