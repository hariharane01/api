const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.listen(9000, () => {
  console.log("server is connected");
});
