const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

const LoginRoutes = require("./routes/LoginRoutes");
//middlewares
app.use(express.json());
app.use(cors());

app.use("/login", LoginRoutes);

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
