const User = require("../models/User");

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ msg: "successfully logged in!" });
};

exports.SignUpUser = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password || !type) {
    return res.status(400).json({
      msg: "Bad Request!",
    });
  }

  try {
    const response = await User.create({ email, password, type });
    return res.status(201).json({
      msg: "USER SUCCESSFULLY CREATED",
      response: response,
    });
  } catch (err) {
    console.log("Error", err);
    res.send(400).send("Something went wrong");
  }
};
