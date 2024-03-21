const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //use to get dotenv file 
dotenv.config();

const authRoute = require("./routes/auth"); //creating router for auth file 
const usersRoute = require("./routes/users"); //creating router for user  file 

const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

//to connect MongoDB we using mongoose 
mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute); //route for authenthication 
app.use("/api/users", usersRoute); //route for authenthication 


app.listen(9000, () => {
  console.log("server is connected");
});
