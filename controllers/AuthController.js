const User = require("../models/User");
const {
  generateHashedPassword,
  validateCredentials,
  createToken,
} = require("../utils");

// login
//
exports.LoginUser = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password || !type) {
    return res.status(400).json({
      status: "FAILED",
      msg: "Bad Request! Insufficient Data",
    });
  }

  const validationError = await validateCredentials(email, password);
  if (validationError?.length > 0) {
    return res.status(400).json({
      status: "ERROR",
      errors: validationError,
    });
  }
  const response = await User.findOne({ email });
  if (!response._doc) {
    return res.status(401).json({
      status: "ERROR",
      data: [],
      message:
        "Invalid email or password. Please try again with the correct credentials.",
    });
  } else {
    const token = createToken(response._doc.email);
    const { password, ...user_data } = response?._doc;

    return res.status(200).json({
      status: "SUCCESS",
      response: user_data,
      msg: "Successfully logged in!",
      access_token: token,
    });
  }
};

// signup
//
//
exports.SignUpUser = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password || !type) {
    return res.status(400).json({
      msg: "Bad Request! Insufficient Data",
      status: "FAILED",
    });
  }
  const validationError = await validateCredentials(email, password);

  if (validationError?.length > 0) {
    return res.status(400).json({
      errors: validationError,
      status: "ERRORS",
    });
  }
  const exist_user = await User.findOne({ email });

  if (!exist_user?._doc) {
    const hashedPassword = await generateHashedPassword(password);

    try {
      const response = await User.create({
        email: email,
        password: hashedPassword,
        type: type,
      });

      const token = createToken(email);
      const { password, ...response_data } = response._doc;

      return res.status(201).json({
        msg: "USER SUCCESSFULLY CREATED",
        response: response_data,
        access_token: token,
      });
    } catch (err) {
      console.log("Error", err);
      return res
        .status(400)
        .json({ status: "ERROR", msg: "Something went wrong" });
    }
  } else {
    return res
      .status(400)
      .json({ status: "FAILED", msg: "This is already registered" });
  }
};
