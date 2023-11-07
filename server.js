const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
