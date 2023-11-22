const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URI;
const mongoose = require("mongoose");

const AuthRoutes = require("./routes/AuthRoutes");

// db connection
mongoose
  .connect(DB_URL)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });

//middlewares
app.use(express.json());
app.use(cors());

app.use(AuthRoutes);
