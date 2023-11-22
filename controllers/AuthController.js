const User = require("../models/User");
const {
  validateEmail,
  validatePassword,
  generateHashedPassword,
} = require("../utils");

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ msg: "successfully logged in!" });
};

exports.SignUpUser = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password || !type) {
    return res.status(400).json({
      msg: "Bad Request! Insufficient Data",
    });
  }
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
  if (validationError?.length > 0) {
    return res.status(400).json({
      errors: validationError,
    });
  }

  const hashedPassword = await generateHashedPassword(password);
  try {
    const response = await User.create({ email, hashedPassword, type });
    return res.status(201).json({
      msg: "USER SUCCESSFULLY CREATED",
      response: response,
    });
  } catch (err) {
    console.log("Error", err);
    res.send(400).send("Something went wrong");
  }
};
