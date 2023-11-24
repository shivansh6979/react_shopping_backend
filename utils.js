const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(email);
};

const validatePassword = async (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
};

const validateCredentials = async (email, password) => {
  const validationError = [];
  const emailFlag = validateEmail(email);
  const passwordFlag = validatePassword(password);
  if (emailFlag) {
    validationError.push({
      field: "email",
      message: "Email is not in the required format !",
    });
  }
  if (passwordFlag) {
    validationError.push({
      field: "password",
      message: "password is not in the required format !",
    });
  }
  return validationError;
};

const createToken = async (id) => {
  const token = await jwt.sign(
    id,
    "My app secret",
    { algorithm: "RS256" },
    (err, token) => {
      if (err) {
        console.error(err);
      } else if (token) {
        console.log("token", token);
      }
    }
  );
  return token;
};

module.exports = {
  validateEmail,
  validatePassword,
  generateHashedPassword,
  validateCredentials,
  createToken,
};
