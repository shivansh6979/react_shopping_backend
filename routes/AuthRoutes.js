const express = require("express");
const { LoginUser, SignUpUser } = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", LoginUser);
router.post("/signup", SignUpUser);

module.exports = router;
