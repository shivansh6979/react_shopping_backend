const express = require("express");
const { LoginUser } = require("../controllers/LoginController");

const router = express.Router();

router.post("/", LoginUser);

module.exports = router;
